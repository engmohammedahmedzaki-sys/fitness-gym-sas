import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, CheckCircle2, CreditCard, Mail, Phone, UserRound } from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';
import { paymentGateways, saasPlans } from '../data/tenants.js';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPlan = searchParams.get('plan') || 'trial';
  const [planId, setPlanId] = useState(initialPlan);
  const [form, setForm] = useState({
    gymName: '',
    ownerName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState([]);
  const plan = useMemo(() => saasPlans.find((item) => item.id === planId) || saasPlans[0], [planId]);
  const availableGateways = paymentGateways.filter((gateway) => plan.gateways.includes(gateway.id));

  const fields = [
    { key: 'gymName', label: 'اسم النادي', icon: Building2 },
    { key: 'ownerName', label: 'اسم المسؤول', icon: UserRound },
    { key: 'phone', label: 'رقم الموبايل', icon: Phone },
    { key: 'email', label: 'البريد الإلكتروني', icon: Mail },
  ];

  const handleSubmit = () => {
    const missing = fields.filter((field) => !form[field.key].trim()).map((field) => field.label);
    const emailLooksWrong = form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const phoneLooksWrong = form.phone.trim() && form.phone.replace(/\D/g, '').length < 8;
    const nextErrors = [
      ...missing.map((field) => `أنت نسيت ${field}`),
      ...(emailLooksWrong ? ['البريد الإلكتروني محتاج صيغة صحيحة'] : []),
      ...(phoneLooksWrong ? ['رقم الموبايل قصير أو غير صحيح'] : []),
    ];

    if (nextErrors.length) {
      setErrors(nextErrors);
      return;
    }

    setErrors([]);
    const params = new URLSearchParams({
      plan: plan.id,
      gym: form.gymName.trim(),
      mode: plan.id === 'trial' ? 'trial' : 'payment',
    });
    navigate(`/thank-you?${params.toString()}`);
  };

  return (
    <main className="rtl min-h-screen bg-midnight-radial bg-midnight-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark className="size-12" />
            <span className="font-extrabold">Fitness Gym</span>
          </Link>
          <Link to="/login" className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-extrabold text-white/78">
            دخول مستخدم حالي
          </Link>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <form className="glass-panel-strong rounded-3xl p-6">
            <p className="text-sm font-extrabold text-panda-gold">تسجيل نادي جديد</p>
            <h1 className="mt-3 font-display text-3xl font-black sm:text-5xl">ابدأ تجربة 14 يوم أو فعّل باقتك.</h1>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/58">
              بعد التسجيل يتفتح Tenant جديد للنادي، ويتحدد له الباقة، والفروع، وطرق الدفع المتاحة حسب تحكم الماستر.
            </p>

            {errors.length ? (
              <div className="mt-6 rounded-2xl border border-rose-300/30 bg-rose-300/10 p-4">
                <p className="text-sm font-black text-rose-100">كمّل البيانات الناقصة الأول</p>
                <div className="mt-3 grid gap-2">
                  {errors.map((error) => (
                    <p key={error} className="text-sm font-bold text-rose-100/80">{error}</p>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {fields.map(({ key, label, icon: Icon }) => (
                <label key={key} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-white/66">
                    <Icon className="size-4 text-electric-cyan" aria-hidden="true" />
                    {label}
                  </span>
                  <input
                    value={form[key]}
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    className="mt-3 w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/30"
                    placeholder={label}
                    type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <span className="text-sm font-extrabold text-white/66">اختيار الباقة</span>
              <select
                value={planId}
                onChange={(event) => setPlanId(event.target.value)}
                className="mt-3 w-full rounded-xl border border-white/10 bg-midnight-900 px-3 py-3 text-sm font-bold text-white outline-none"
              >
                {saasPlans.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.price ? `${item.price} ج.م / ${item.billing}` : item.billing}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-6 w-full rounded-2xl bg-gradient-to-l from-electric-blue to-panda-gold px-5 py-4 text-base font-black text-midnight-950"
            >
              {plan.id === 'trial' ? 'ابدأ التجربة 14 يوم' : 'الانتقال للدفع'}
            </button>
          </form>

          <aside className="glass-panel rounded-3xl p-6">
            <h2 className="font-display text-2xl font-black">ملخص الباقة</h2>
            <p className="mt-2 text-sm font-bold text-white/50">{plan.subtitle}</p>
            <p className="mt-6 text-3xl font-black">
              {plan.price ? `${plan.price.toLocaleString('ar-EG')} ج.م` : 'مجاني'}
              <span className="text-sm text-white/45"> / {plan.billing}</span>
            </p>
            <div className="mt-5 grid gap-2">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-2 text-sm font-bold text-white/72">
                  <CheckCircle2 className="size-4 text-emerald-200" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="flex items-center gap-2 text-sm font-extrabold text-white/72">
                <CreditCard className="size-4 text-panda-gold" aria-hidden="true" />
                طرق الدفع المتاحة
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableGateways.length ? (
                  availableGateways.map((gateway) => (
                    <span key={gateway.id} className="rounded-full bg-electric-blue/10 px-3 py-1 text-xs font-extrabold text-electric-cyan">
                      {gateway.name}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-panda-gold/10 px-3 py-1 text-xs font-extrabold text-panda-gold">بدون دفع أثناء التجربة</span>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
