import React from 'react';
import { Barcode, Printer, QrCode, ScanLine } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { printProfiles } from '../data/platformModules.js';

export default function PrintSettings() {
  return (
    <section aria-labelledby="print-settings-title">
      <PageHeader
        eyebrow="الطباعة والباركود"
        title="إعدادات الطابعات والملصقات"
        description="تحكم في الطابعات الحرارية، مقاسات الباركود، الكارنيهات، وإعدادات قارئ الباركود."
        icon={Printer}
      />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">بروفايلات الطباعة</h2>
          <div className="mt-4 grid gap-3">
            {printProfiles.map((profile) => (
              <div key={profile.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-extrabold text-white">{profile.name}</p>
                  <Barcode className="size-5 text-panda-gold" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm font-bold text-white/48">{profile.width} - {profile.use}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel-strong rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">إعدادات الربط</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ['قارئ الباركود', 'USB / Bluetooth / Mobile Scan', ScanLine],
              ['طابعة الفواتير', 'Thermal 58mm أو 80mm', Printer],
              ['طابعة الملصقات', 'Label printer مع مقاس مخصص', Barcode],
              ['QR / Barcode', 'Code39 أو QR حسب نوع الكارت', QrCode],
            ].map(([title, desc, Icon]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <Icon className="size-6 text-electric-cyan" aria-hidden="true" />
                <p className="mt-4 font-extrabold text-white">{title}</p>
                <p className="mt-2 text-sm font-bold text-white/48">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
