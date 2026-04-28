import React, { useContext, useState } from 'react';
import { ImageUp, Palette, Save, Settings2 } from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { GymContext } from '../App.jsx';

export default function TenantBranding() {
  const { auth } = useContext(GymContext);
  const [branding, setBranding] = useState({
    gymName: auth.gymCode || 'Fitness Gym',
    branch: auth.branch || 'الفرع الرئيسي',
    primaryColor: '#00A3FF',
    accentColor: '#F8C14A',
    logoName: 'brand-icon.svg',
  });

  return (
    <section aria-labelledby="tenant-branding-title">
      <PageHeader
        eyebrow="هوية النادي"
        title="إعدادات الاسم واللوجو"
        description="كل نادي يقدر يظبط اسمه، ألوانه، ولوجوه بدون ما يلمس الكود أو الأساس الخاص بنا."
        icon={Settings2}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">بيانات الهوية</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-white/52">اسم النادي</span>
              <input
                value={branding.gymName}
                onChange={(event) => setBranding((current) => ({ ...current, gymName: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-white/52">الفرع الافتراضي</span>
              <input
                value={branding.branch}
                onChange={(event) => setBranding((current) => ({ ...current, branch: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-white/52">اللون الأساسي</span>
              <input
                value={branding.primaryColor}
                onChange={(event) => setBranding((current) => ({ ...current, primaryColor: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-white/52">لون التمييز</span>
              <input
                value={branding.accentColor}
                onChange={(event) => setBranding((current) => ({ ...current, accentColor: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
              />
            </label>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
            <div className="flex items-center gap-3">
              <ImageUp className="size-5 text-electric-cyan" aria-hidden="true" />
              <div>
                <p className="font-extrabold text-white">رفع لوجو النادي</p>
                <p className="mt-1 text-sm text-white/50">جاهز لاحقًا للربط بالـ storage على الهوست.</p>
              </div>
            </div>
          </div>

          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-panda-gold px-5 py-3 text-sm font-extrabold text-midnight-950">
            <Save className="size-5" aria-hidden="true" />
            حفظ الهوية
          </button>
        </div>

        <aside className="glass-panel-strong rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">معاينة الهوية</h2>
          <div className="mt-5 rounded-3xl border border-white/10 bg-midnight-950 p-5">
            <BrandMark className="size-16" showText />
            <div className="mt-5 rounded-2xl p-4" style={{ background: `${branding.primaryColor}22`, border: `1px solid ${branding.primaryColor}66` }}>
              <p className="text-sm font-bold text-white/54">النادي</p>
              <p className="mt-1 text-2xl font-extrabold text-white">{branding.gymName}</p>
              <p className="mt-1 text-sm font-bold" style={{ color: branding.accentColor }}>{branding.branch}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <span className="h-10 flex-1 rounded-2xl" style={{ background: branding.primaryColor }} />
              <span className="h-10 flex-1 rounded-2xl" style={{ background: branding.accentColor }} />
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-panda-gold/25 bg-panda-gold/10 p-4 text-sm leading-7 text-panda-gold">
            الماستر يحتفظ بالتحكم في الخطة، الصلاحيات، الدفع، وتفعيل أو إيقاف النادي.
          </div>
        </aside>
      </div>
    </section>
  );
}
