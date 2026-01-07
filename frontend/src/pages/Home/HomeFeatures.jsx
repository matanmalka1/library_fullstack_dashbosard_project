
import { Star, ShieldCheck, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast Delivery',
    desc: 'Get your favorites delivered in as little as 24 hours.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Secure Payment',
    desc: 'Your transactions are always protected and private.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Premium Curation',
    desc: 'Only the highest quality editions and translations.',
  },
];

export const HomeFeatures = () => (
  <section className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {FEATURES.map((feature, i) => (
        <div
          key={i}
          className="bg-white p-8 rounded-[24px] border border-slate-200 transition-shadow hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)]"
        >
          <div className="w-12 h-12 bg-indigo-50 rounded-[18px] flex items-center justify-center mb-6 text-indigo-600">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
          <p className="text-slate-500 leading-[1.7]">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
