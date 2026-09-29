import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const APP_URL = 'https://cryptox-neuron-ai.onrender.com';

const plans = [
  {
    name: 'Starter',
    price: '₹0/month',
    description: 'For individuals exploring customer intelligence.',
    features: ['Basic Analytics', 'Demo Dataset', 'Community Support'],
    cta: 'Start for Free',
    href: APP_URL + '/login',
    featured: false,
  },
  {
    name: 'Professional',
    price: '₹999/month',
    description: 'For growing teams managing real customer data.',
    features: ['Unlimited Customers', 'AI Predictions', 'Reports', 'API Access'],
    featured: true,
    cta: 'Start Professional',
    href: '/upgrade?plan=professional',
  },
  {
    name: 'Enterprise',
    price: 'Custom Pricing',
    description: 'For organizations requiring advanced capabilities.',
    features: ['Dedicated AI Models', 'Custom Integrations', 'Priority Support', 'Team Management'],
    cta: 'Contact Sales',
    href: '/upgrade?plan=enterprise',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <section className="page-section page-with-bg pricing-page">
      <div className="section-intro">
        <span className="badge">Pricing</span>
        <h2>Plans built around customer intelligence.</h2>
        <p>
          Start with the essentials, then upgrade when your customer analytics
          workflow grows.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            className={'pricing-card glass-panel ' + (plan.featured ? 'featured' : '')}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -6 }}
          >
            {plan.featured && <span className="featured-tag">Most Popular</span>}
            <h3>{plan.name}</h3>
            <div className="plan-price">{plan.price}</div>
            <p className="plan-description">{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <Link
              to={plan.href}
              className={(plan.featured ? 'primary-button' : 'secondary-button') + ' full-width pricing-cta'}
            >
              {plan.cta} <span aria-hidden="true">→</span>
            </Link>
          </motion.article>
        ))}
      </div>

      <p className="pricing-footnote">
        Professional and Enterprise upgrades require payment verification before
        premium access is enabled.
      </p>
    </section>
  );
}
