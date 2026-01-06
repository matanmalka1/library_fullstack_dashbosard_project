import React from 'react';
import { Star, ShieldCheck, Zap } from 'lucide-react';
import './HomeFeatures.css';

const FEATURES = [
  {
    icon: <Zap className="home__feature-icon-svg" />,
    title: 'Fast Delivery',
    desc: 'Get your favorites delivered in as little as 24 hours.',
  },
  {
    icon: <ShieldCheck className="home__feature-icon-svg" />,
    title: 'Secure Payment',
    desc: 'Your transactions are always protected and private.',
  },
  {
    icon: <Star className="home__feature-icon-svg" />,
    title: 'Premium Curation',
    desc: 'Only the highest quality editions and translations.',
  },
];

export const HomeFeatures = () => (
  <section className="home__section home__container">
    <div className="home__features">
      {FEATURES.map((feature, i) => (
        <div key={i} className="home__feature-card">
          <div className="home__feature-icon">{feature.icon}</div>
          <h3 className="home__feature-title">{feature.title}</h3>
          <p className="home__feature-desc">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
