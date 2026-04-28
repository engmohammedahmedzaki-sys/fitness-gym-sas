import React from 'react';
import { Globe2, Languages, Palette, Percent } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { countries, sportVerticals } from '../data/platformModules.js';

export default function LocalizationSettings() {
  return (
    <section aria-labelledby="localization-title">
      <PageHeader
        eyebrow="الدول والتخصيص"
        title="العملات والضرائب وأنواع الأنشطة"
        description="مصر، السعودية، الإمارات، الكويت، مع تخصيص اسم النشاط، العملة، الضريبة، اللغة، والوضع الفاتح أو الداكن."
        icon={Globe2}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">الدول والعملات</h2>
          <div className="mt-4 grid gap-3">
            {countries.map((country) => (
              <div key={country.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:grid-cols-4">
                <p className="font-extrabold text-white">{country.name}</p>
                <p className="text-sm font-bold text-electric-cyan">{country.symbol}</p>
                <p className="text-sm font-bold text-white/56">{country.taxName}</p>
                <p className="text-sm font-bold text-panda-gold">{country.defaultTax}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel-strong rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">تخصيص النشاط والواجهة</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {sportVerticals.map((sport) => (
              <span key={sport} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-extrabold text-white/68">
                {sport}
              </span>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['لغة تلقائية', Languages],
              ['ضريبة حسب الدولة', Percent],
              ['Light / Dark', Palette],
            ].map(([label, Icon]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <Icon className="size-5 text-panda-gold" aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
