import React from 'react';

export default function BrandMark({ className = 'size-11', showText = false }) {
  return (
    <div className={`inline-flex items-center gap-3 ${showText ? '' : 'justify-center'}`}>
      <span className={`grid shrink-0 place-items-center rounded-2xl bg-midnight-950 shadow-glass ${className}`}>
        <img src="/brand-icon.svg" alt="Fitness Gym" className="h-full w-full rounded-2xl object-cover" />
      </span>
      {showText ? (
        <span>
          <span className="block font-display text-lg font-extrabold leading-none text-white">Fitness Gym</span>
          <span className="mt-1 block text-xs font-bold leading-none text-panda-gold">Panda Plus SaaS</span>
        </span>
      ) : null}
    </div>
  );
}
