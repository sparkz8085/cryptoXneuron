import pandas as pd
import json
import os
from database.connection import close_mongodb_client, get_customer_collection, get_mongodb_client
from config import CUSTOMER_COLLECTION_NAME

COLLECTION = None
MONGO_CLIENT = None

# Try to connect to MongoDB, but don't fail if connection fails
if os.getenv("MONGO_DB_URL"):
    try:
        MONGO_CLIENT = get_mongodb_client()
        COLLECTION = get_customer_collection(MONGO_CLIENT)
        print("[OK] Successfully connected to MongoDB")
        
    except Exception as e:
        print("[FAIL] MongoDB connection failed; proceeding with local backup")
        print("  Proceeding without MongoDB (data will be saved locally)")
        COLLECTION = None
else:
    print("[WARN] MONGO_DB_URL not set in .env file")
    print("  Proceeding without MongoDB (data will be saved locally)")

# Read and process data
try:
    df = pd.read_csv("notebooks/marketing_campaign.csv", sep="\t")
    df.reset_index(drop=True, inplace=True)

    json_record = list(json.loads(df.T.to_json()).values())

    # Try to insert into MongoDB if connected
    if COLLECTION is not None:
        try:
            COLLECTION.insert_many(json_record)
            print("[OK] Data successfully migrated to MongoDB Cloud Atlas!")
            print(f"  Inserted {len(json_record)} records")
        except Exception as e:
            raise RuntimeError(
                "MongoDB customer insert failed after a successful connection "
                f"(error_type={type(e).__name__})."
            ) from e
    else:
        # No MongoDB connection, save locally
        with open("notebooks/data_backup.json", "w") as f:
            json.dump(json_record, f, indent=2)
        print("[OK] Data saved locally to notebooks/data_backup.json")
        print(f"  Total records: {len(json_record)}")
    
except Exception as e:
    print(f"[FAIL] Error during data processing: {e}")
    raise
    
finally:
    close_mongodb_client()