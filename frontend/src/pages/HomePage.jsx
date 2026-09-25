import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const startFreeUrl = 'https://cryptox-neuron-ai.onrender.com/';
const loginUrl = '/login';

const stats = [
  { label: 'Clusters', value: '04' },
  { label: 'Accuracy', value: '96.2%' },
  { label: 'Latency', value: '120ms' },
];

const featureCards = [
  { eyebrow: '01 / Segment', title: 'See the people behind the purchase.', description: 'Turn raw behavior into four clear customer worlds your team can act on.', className: 'bento-feature feature-wide' },
  { eyebrow: '02 / Predict', title: 'Decisions, before the dashboard.', description: 'Score a customer in one pass with production-ready inference.', className: 'bento-feature' },
  { eyebrow: '03 / Learn', title: 'Models that keep their footing.', description: 'Train, compare and monitor without losing the business context.', className: 'bento-feature feature-tall' },
];

export default function HomePage() {
  return (
    <section className="page-section home-page">
      <div className="bento-hero">
        <div className="hero-copy bento-intro">
          <motion.span className="badge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            Powered by Machine Learning
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            Customer intelligence, with a pulse.
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            Find the signal in every customer journey. Categorize, predict and act from one calm, focused workspace.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
            <a href={startFreeUrl} className="primary-button large">Start for Free</a>
            <Link to={loginUrl} className="secondary-button large">Start Demo</Link>
          </motion.div>
          <div className="hero-stats bento-stats">
            {stats.map((stat) => (
              <motion.div key={stat.label} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="dashboard-preview bento-dashboard" initial={{ opacity: 0, scale: 0.94, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.14 }}>
          <div className="dashboard-header">
            <div>
              <p>Premium AI Dashboard</p>
              <h3>Customer Intelligence</h3>
            </div>
            <span className="live-pill">● Live</span>
          </div>
          <div className="dashboard-grid">
            <div className="mini-card accent-card">
              <span>Customer Segmentation</span> 
              <strong>Budget / Regular / Premium / Occasional</strong>
            </div>
            <div className="mini-card">
              <span>AI Predictions</span>
              <strong>Cluster: Premium</strong>
            </div>
            <div className="mini-card wide">
              <span>Customer Distribution</span>
              <div className="distribution-bars">
                <i style={{ width: '25%' }} /><strong style={{ width: '25%' }}>Budget[25%]</strong>
                <i style={{ width: '20%' }} /><strong style={{ width: '20%' }}>Regular[20%]</strong>
                <i style={{ width: '40%' }} /><strong style={{ width: '40%' }}>Premium[40%]</strong>
                <i style={{ width: '15%' }} /><strong style={{ width: '15%' }}>Occasional[15%]</strong>
              </div>
            </div>
            <div className="mini-card">
              <span>Active Models</span>
              <strong>Training + Prediction</strong>
            </div>
            <div className="mini-card">
              <span>Customer Distribution</span>
              <strong>25% / 20% / 40% / 15%</strong>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bento-features">
        {featureCards.map((feature, index) => (
          <motion.article
            key={feature.title}
            className={feature.className}
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08 + index * 0.04 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <span className="feature-index">{feature.eyebrow}</span>
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
