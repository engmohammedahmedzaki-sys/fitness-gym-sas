import React, { useState } from 'react';
import { Braces, Code2, Megaphone, SearchCheck, Share2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { marketingIntegrations } from '../data/platformModules.js';

export default function MarketingSettings() {
  const [seo, setSeo] = useState({
    title: 'Fitness Gym | نظام إدارة نوادي وجيم SaaS',
    description: 'منصة عربية لإدارة النوادي والعضويات والاشتراكات والحضور والمالية مع تقارير وباركود وواتساب.',
    keywords: 'إدارة جيم, نظام نوادي, اشتراكات, حضور, SaaS, Fitness Gym',
    canonical: 'https://fitness-gym-sas.vercel.app/',
  });

  return (
    <section aria-labelledby="marketing-title">
      <PageHeader
        eyebrow="SEO والتسويق"
        title="محركات البحث وأكواد التتبع"
        description="تحكم في Title وDescription وOpen Graph، واربط Google وBing وMeta وPinterest وMerchant Center، مع أماكن آمنة لأكواد Head وBody وFooter."
        icon={Megaphone}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel-strong rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <SearchCheck className="size-6 text-electric-cyan" aria-hidden="true" />
            <h2 className="font-display text-xl font-extrabold">بيانات SEO الأساسية</h2>
          </div>
          <div className="mt-5 grid gap-4">
            {[
              ['title', 'Meta Title'],
              ['description', 'Meta Description'],
              ['keywords', 'Keywords'],
              ['canonical', 'Canonical URL'],
            ].map(([key, label]) => (
              <label key={key} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <span className="text-sm font-extrabold text-white/64">{label}</span>
                <input
                  value={seo[key]}
                  onChange={(event) => setSeo((current) => ({ ...current, [key]: event.target.value }))}
                  className="mt-3 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/30"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Share2 className="size-6 text-panda-gold" aria-hidden="true" />
            <h2 className="font-display text-xl font-extrabold">التكاملات</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {marketingIntegrations.map((integration) => (
              <label key={integration.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-extrabold text-white">{integration.name}</span>
                  <span className="rounded-full bg-electric-blue/10 px-3 py-1 text-xs font-extrabold text-electric-cyan">
                    {integration.status}
                  </span>
                </div>
                <input
                  placeholder={integration.field}
                  className="mt-3 w-full rounded-xl border border-white/10 bg-midnight-950 px-3 py-3 text-sm font-bold text-white outline-none placeholder:text-white/30"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {[
          ['Head Snippets', 'أكواد verification وschema وtracking داخل head'],
          ['Body Start', 'أكواد تفتح بعد بداية body مثل Tag Manager'],
          ['Footer Scripts', 'أكواد قبل نهاية body مثل widgets أو pixels'],
        ].map(([title, description]) => (
          <label key={title} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center gap-3">
              {title === 'Head Snippets' ? <Code2 className="size-5 text-electric-cyan" /> : <Braces className="size-5 text-panda-gold" />}
              <span className="font-display text-lg font-extrabold text-white">{title}</span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/50">{description}</p>
            <textarea
              className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-midnight-950 p-3 text-left text-xs font-bold text-white outline-none placeholder:text-white/28"
              dir="ltr"
              placeholder="<script>...</script>"
            />
          </label>
        ))}
      </div>

      <p className="mt-5 rounded-2xl border border-panda-gold/30 bg-panda-gold/10 p-4 text-sm font-bold leading-7 text-panda-gold">
        عند ربط الباك إند، الأكواد دي لازم تتخزن لكل Tenant وتتفلتر بسماح tags آمنة قبل الحقن في الموقع العام.
      </p>
    </section>
  );
}
