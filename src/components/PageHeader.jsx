import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, description, icon: Icon }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="text-sm font-bold text-panda-gold">{eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{description}</p>
      </div>
      {Icon ? (
        <div className="glass-panel hidden size-16 place-items-center rounded-2xl text-electric-cyan sm:grid">
          <Icon className="size-8" aria-hidden="true" />
        </div>
      ) : null}
    </motion.header>
  );
}
