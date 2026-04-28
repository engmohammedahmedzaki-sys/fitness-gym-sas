import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, CreditCard, MailCheck, Rocket, ShieldCheck } from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';
import { saasPlans } from '../data/tenants.js';

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'trial';
  const gymName = searchParams.get('gym') || 'ناديك';
  const mode = searchParams.get('mode') || 'trial';
  const plan = saasPlans.find((item) => item.id === planId) || saasPlans[0];
  const isTrial = mode === 'trial';

  return (
    <main className="rtl min-h-screen bg-midnight-radial bg-midnight-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark className="size-12" />
            <span className="font-extrabold">Fitness Gym</span>
          </Link>
          <Link to="/login" className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-extrabold text-white/78">
            تسجيل الدخول
          </Link>
        </header>

        <section className="glass-panel-strong overflow-hidden rounded-[2rem]">
          <div className="bg-[radial-gradient(circle_at_80%_20%,rgba(0,163,255,0.28),transparent_30%),linear-gradient(135deg,rgba(0,92,77,0.72),rgba(8,22,52,0.86))] p-6 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-extrabold text-emerald-100">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              تم استلام الطلب
            </span>
            <h1 className="mt-6 font-display text-4xl font-black leading-tight sm:text-6xl">
              شكراً يا {gymName}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-white/72">
              {isTrial
                ? `تم تجهيز طلب تجربة ${plan.billing} على باقة ${plan.name}. الخطوة التالية إنشاء مساحة النادي وتفعيل بيانات الدخول.`
                : `تم تجهيز طلب الاشتراك على باقة ${plan.name}. بعد الدفع سيتم تفعيل النادي وربط الباقة تلقائياً.`}
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-3">
            {[
              ['تأكيد الطلب', 'هنراجع البيانات ونسجل الطلب داخل لوحة الماستر.', MailCheck],
              [isTrial ? 'تفعيل التجربة' : 'تأكيد الدفع', isTrial ? 'تجربة 14 يوم بدون دفع.' : 'Paymob أو Fawaterk حسب الباقة.', isTrial ? Rocket : CreditCard],
              ['بيانات الدخول', 'هتوصل بيانات الدخول للمسؤول بعد التفعيل.', ShieldCheck],
            ].map(([title, desc, Icon]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <Icon className="size-7 text-panda-gold" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-black text-white">{title}</h2>
                <p className="mt-2 text-sm font-bold leading-7 text-white/52">{desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/login" className="rounded-2xl bg-panda-gold px-5 py-3 text-center text-sm font-black text-midnight-950">
                الذهاب لتسجيل الدخول
              </Link>
              <Link to="/" className="rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-3 text-center text-sm font-extrabold text-white/76">
                العودة للموقع
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
