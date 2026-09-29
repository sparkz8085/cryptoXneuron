import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const APP_URL = 'https://cryptox-neuron-ai.onrender.com';

const PLAN_INFO = {
  professional: {
    name: 'Professional',
    price: '₹999/month',
    qr: import.meta.env.VITE_PROFESSIONAL_PAYMENT_QR_URL || '/payment/professional-qr.svg',
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom Pricing',
    qr: import.meta.env.VITE_ENTERPRISE_PAYMENT_QR_URL || '',
  },
};

export default function UpgradePage() {
  const [params] = useSearchParams();
  const requestedPlan = params.get('plan')?.toLowerCase();
  const plan = PLAN_INFO[requestedPlan] || PLAN_INFO.professional;
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submitPaymentReference(event) {
    event.preventDefault();
    setStatus('');

    if (!reference.trim()) {
      setStatus('Enter your payment reference / transaction ID.');
      return;
    }

    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.set('plan', requestedPlan || 'professional');
      body.set('payment_reference', reference.trim());

      const response = await fetch(
        APP_URL + '/api/subscriptions/request',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = APP_URL + '/login?info=Please+sign+in+before+submitting+a+subscription+request.';
        return;
      }

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Unable to submit payment reference.');
      }

      setStatus(
        'Request ' + data.request_id + ' submitted. Your subscription is pending verification.'
      );
      setReference('');
    } catch (error) {
      setStatus(error.message || 'Unable to submit payment reference.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page-section upgrade-page">
      <motion.div
        className="upgrade-panel glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <span className="badge">Secure Upgrade</span>
          <h2>{plan.name}</h2>
          <p className="upgrade-price">{plan.price}</p>
          <p>
            Complete the payment using the configured QR code, then submit your
            payment reference for verification.
          </p>
        </div>

        <div className="payment-grid">
          <div className="qr-panel">
            {plan.qr ? (
              <img
                src={plan.qr}
                alt={plan.name + ' payment QR code'}
                className="payment-qr"
              />
            ) : (
              <div className="qr-placeholder">
                <strong>Payment QR not configured</strong>
                <span>
                  Set the appropriate VITE_*_PAYMENT_QR_URL in the Vercel
                  environment before accepting payments.
                </span>
              </div>
            )}
          </div>

          <div className="payment-details">
            <h3>Payment verification</h3>
            <ol>
              <li>Scan the QR code and complete the payment.</li>
              <li>Copy your transaction/payment reference.</li>
              <li>Submit it below.</li>
              <li>Wait for verification before premium access is enabled.</li>
            </ol>

            <form onSubmit={submitPaymentReference} className="payment-form">
              <label htmlFor="payment-reference">Payment reference</label>
              <input
                id="payment-reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                placeholder="Transaction ID / UTR"
                maxLength={120}
                autoComplete="off"
              />
              <button
                className="primary-button large full-width"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit for Verification'}
              </button>
            </form>

            {status && <div className="payment-status">{status}</div>}

            <p className="payment-note">
              Premium access is not activated by the QR page or by clicking the
              submit button. Access is enabled after payment verification.
              Expected verification window: within 12 hours.
            </p>
          </div>
        </div>

        <div className="upgrade-footer">
          <Link to="/pricing" className="back-link">Back to Pricing</Link>
          <a href={APP_URL + '/login'} className="back-link">Open Secure Login</a>
        </div>
      </motion.div>
    </section>
  );
}
