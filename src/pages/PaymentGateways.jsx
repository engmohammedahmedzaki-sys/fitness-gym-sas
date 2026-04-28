import React, { useMemo, useState } from 'react';
import { Copy, CreditCard, KeyRound, Link as LinkIcon, ShieldCheck, ToggleRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { paymentGateways, saasPlans } from '../data/tenants.js';

export default function PaymentGateways() {
  const [currentPlan, setCurrentPlan] = useState('pro');
  const [activeGateway, setActiveGateway] = useState('paymob');

  const plan = useMemo(() => saasPlans.find((item) => item.id === currentPlan) || saasPlans[0], [currentPlan]);
  const visibleGateways = paymentGateways.map((gateway) => ({
    ...gateway,
    enabled: plan.gateways.includes(gateway.id),
  }));
  const selectedGateway = visibleGateways.find((gateway) => gateway.id === activeGateway) || visibleGateways[0];

  return (
    <section aria-labelledby="payment-gateways-title">
      <PageHeader
        eyebrow="إعدادات الدفع"
        title="بوابات الدفع والكول باك"
        description="كل نادي يضيف مفاتيح Paymob أو Fawaterk الخاصة به، والماستر يحدد البوابات المتاحة حسب الباقة."
        icon={CreditCard}
      />

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <aside className="glass-panel rounded-2xl p-5">
          <label className="block text-sm font-extrabold text-white/70" htmlFor="plan-select">
            محاكاة باقة النادي الحالية
          </label>
          <select
            id="plan-select"
            value={currentPlan}
            onChange={(event) => {
              const nextPlan = event.target.value;
              setCurrentPlan(nextPlan);
              const firstGateway = saasPlans.find((item) => item.id === nextPlan)?.gateways[0];
              if (firstGateway) setActiveGateway(firstGateway);
            }}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-midnight-900 px-4 py-3 text-sm font-bold text-white outline-none"
          >
            {saasPlans.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="mt-5 grid gap-3">
            {visibleGateways.map((gateway) => (
              <button
                key={gateway.id}
                type="button"
                disabled={!gateway.enabled}
                onClick={() => setActiveGateway(gateway.id)}
                className={`rounded-2xl border p-4 text-start transition ${
                  activeGateway === gateway.id && gateway.enabled
                    ? 'border-panda-gold/60 bg-panda-gold/10'
                    : gateway.enabled
                      ? 'border-white/10 bg-white/[0.06] hover:bg-white/[0.1]'
                      : 'border-white/8 bg-white/[0.03] opacity-45'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-black text-white">{gateway.name}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${gateway.enabled ? 'bg-emerald-300/10 text-emerald-200' : 'bg-rose-300/10 text-rose-200'}`}>
                    {gateway.enabled ? 'ظاهر للنادي' : 'مقفول من الباقة'}
                  </span>
                </div>
                <p className="mt-2 text-sm font-bold text-white/48">{gateway.status}</p>
              </button>
            ))}
          </div>
        </aside>

        <div className="glass-panel-strong rounded-2xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-white/45">البوابة المحددة</p>
              <h2 className="font-display text-2xl font-black">{selectedGateway.name}</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-electric-cyan/30 bg-electric-blue/10 px-4 py-2 text-sm font-extrabold text-electric-cyan">
              <ToggleRight className="size-4" aria-hidden="true" />
              {selectedGateway.enabled ? 'جاهزة للإعداد' : 'تحتاج ترقية الباقة'}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-white/70">
              <LinkIcon className="size-4 text-panda-gold" aria-hidden="true" />
              رابط Callback / Webhook
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-midnight-950 p-3 sm:flex-row sm:items-center">
              <code className="min-w-0 flex-1 break-all text-xs font-bold text-electric-cyan">{selectedGateway.callbackUrl}</code>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-extrabold text-white">
                <Copy className="size-4" aria-hidden="true" />
                نسخ
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {selectedGateway.fields.map((field) => (
              <label key={field} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <span className="flex items-center gap-2 text-sm font-extrabold text-white/64">
                  <KeyRound className="size-4 text-electric-cyan" aria-hidden="true" />
                  {field}
                </span>
                <input
                  disabled={!selectedGateway.enabled}
                  placeholder={selectedGateway.enabled ? `أدخل ${field}` : 'غير متاح في هذه الباقة'}
                  className="mt-3 w-full rounded-xl border border-white/10 bg-midnight-950 px-3 py-3 text-sm font-bold text-white outline-none placeholder:text-white/28 disabled:cursor-not-allowed"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['اختبار الاتصال', 'حفظ الإعدادات', 'تفعيل الدفع'].map((action, index) => (
              <button
                key={action}
                type="button"
                disabled={!selectedGateway.enabled}
                className={`rounded-2xl px-4 py-3 text-sm font-black ${
                  index === 1 ? 'bg-panda-gold text-midnight-950' : 'border border-white/10 bg-white/[0.07] text-white'
                } disabled:opacity-40`}
              >
                {action}
              </button>
            ))}
          </div>

          <p className="mt-5 rounded-2xl border border-panda-gold/30 bg-panda-gold/10 p-4 text-sm font-bold leading-7 text-panda-gold">
            التنفيذ الفعلي في الباك إند: حفظ المفاتيح مشفرة، استقبال Callback، تحديث حالة اشتراك النادي، وتسجيل كل محاولة دفع في جدول audit.
          </p>
        </div>
      </div>
    </section>
  );
}
