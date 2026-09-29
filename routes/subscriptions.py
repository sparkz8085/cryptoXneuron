import datetime
import secrets

from fastapi import APIRouter, Request, Form
from fastapi.responses import JSONResponse

from database.connection import get_mongodb_client, get_database
from services.auth_session import verify_session_cookie

router = APIRouter(prefix="/api/subscriptions", tags=["subscriptions"])

ALLOWED_PLANS = {"professional", "enterprise"}


def _current_user(request: Request):
    return verify_session_cookie(request.cookies.get("session"))


@router.post("/request")
async def request_upgrade(
    request: Request,
    plan: str = Form(...),
    payment_reference: str = Form(...),
):
    user = _current_user(request)
    if not user:
        return JSONResponse(status_code=401, content={"status": False, "message": "Authentication required."})

    plan = plan.strip().lower()
    payment_reference = payment_reference.strip()

    if plan not in ALLOWED_PLANS:
        return JSONResponse(status_code=400, content={"status": False, "message": "Unsupported subscription plan."})

    if not payment_reference or len(payment_reference) > 120:
        return JSONResponse(status_code=400, content={"status": False, "message": "A valid payment reference is required."})

    client = get_mongodb_client()
    if client is None:
        return JSONResponse(status_code=503, content={"status": False, "message": "Subscription service is temporarily unavailable."})

    database = get_database(client)
    collection = database["subscription_requests"]

    now = datetime.datetime.now(datetime.timezone.utc)
    request_id = secrets.token_urlsafe(12)

    document = {
        "request_id": request_id,
        "user_id": user.get("_id"),
        "user_email": user.get("email"),
        "plan": plan,
        "payment_reference": payment_reference,
        "status": "pending_verification",
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }

    collection.insert_one(document)
    collection.create_index([("user_id", 1), ("created_at", -1)])
    collection.create_index([("request_id", 1)], unique=True)

    return {
        "status": True,
        "request_id": request_id,
        "subscription_status": "pending_verification",
        "message": "Payment reference submitted. Access will be enabled after payment verification.",
    }
