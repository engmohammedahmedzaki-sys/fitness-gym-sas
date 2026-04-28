import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, helper, icon: Icon, accent = 'blue' }) {
  const accentClasses = accent === 'gold'
    ? 'from-panda-gold/25 text-panda-gold shadow-gold'
    : 'from-electric-blue/25 text-electric-cyan shadow-glass';

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className="glass-panel min-h-[142px] rounded-2xl p-4 text-white shadow-glass"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white/68">{title}</h3>
          <p className="mt-3 font-display text-3xl font-extrabold tracking-normal">{value}</p>
        </div>
        <div className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${accentClasses}`}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-white/62">{helper}</p>
    </motion.article>
  );
}
