import React, { useMemo, useRef, useState } from 'react';
import { FileText, ImageDown, MessageCircle, Printer, QrCode, Send, Smartphone, Sparkles } from 'lucide-react';
import Code39Barcode from '../components/Code39Barcode.jsx';
import PageHeader from '../components/PageHeader.jsx';

const templates = {
  new: {
    label: 'اشتراك جديد',
    intro: 'أهلًا {memberName}، تم تفعيل اشتراكك بنجاح في {gymName}.',
  },
  renew: {
    label: 'تجديد اشتراك',
    intro: 'أهلًا {memberName}، تم تجديد اشتراكك بنجاح في {gymName}.',
  },
};

export default function WhatsAppAutomation() {
  const cardRef = useRef(null);
  const [form, setForm] = useState({
    type: 'new',
    gymName: 'Fitness Gym',
    memberName: 'محمد أحمد',
    phone: '201000000000',
    planName: 'اشتراك شهري',
    startDate: '2026-04-28',
    endDate: '2026-05-28',
    barcodeValue: 'CARD-M-20260428',
  });

  const message = useMemo(() => {
    const intro = templates[form.type].intro
      .replace('{memberName}', form.memberName)
      .replace('{gymName}', form.gymName);

    return [
      intro,
      '',
      `الخطة: ${form.planName}`,
      `تاريخ البداية: ${form.startDate}`,
      `تاريخ الانتهاء: ${form.endDate}`,
      `كود الحضور: ${form.barcodeValue}`,
      '',
      'احتفظ بالكود لاستخدامه في تسجيل الحضور والدخول والخروج.',
      'Developed by Mohamed Zaki - Panda Plus',
    ].join('\n');
  }, [form]);

  const whatsappUrl = `https://wa.me/${form.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  const handlePrintCard = () => {
    window.print();
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1260;
    const context = canvas.getContext('2d');

    context.fillStyle = '#050816';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = context.createLinearGradient(0, 0, 900, 1260);
    gradient.addColorStop(0, 'rgba(0, 163, 255, 0.38)');
    gradient.addColorStop(1, 'rgba(248, 193, 74, 0.22)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ffffff';
    context.beginPath();
    context.roundRect(70, 80, 760, 1100, 42);
    context.fill();

    context.fillStyle = '#050816';
    context.beginPath();
    context.roundRect(350, 130, 200, 150, 28);
    context.fill();
    context.fillStyle = '#37D7FF';
    context.font = '900 42px Cairo, Arial';
    context.textAlign = 'center';
    context.fillText('FG', 450, 222);

    context.direction = 'rtl';
    context.textAlign = 'right';
    context.fillStyle = '#050816';
    context.font = '900 42px Cairo, Arial';
    context.fillText(form.gymName, 780, 350);

    context.fillStyle = '#334155';
    context.font = '700 28px Cairo, Arial';
    context.fillText(templates[form.type].label, 780, 400);

    const details = [
      ['اسم العميل', form.memberName],
      ['خطة الاشتراك', form.planName],
      ['تاريخ البداية', form.startDate],
      ['تاريخ الانتهاء', form.endDate],
      ['كود الحضور', form.barcodeValue],
    ];

    details.forEach(([label, value], index) => {
      const y = 480 + index * 92;
      context.fillStyle = '#F1F5F9';
      context.beginPath();
      context.roundRect(120, y - 48, 660, 70, 18);
      context.fill();
      context.fillStyle = '#64748B';
      context.font = '700 20px Cairo, Arial';
      context.fillText(label, 750, y - 18);
      context.fillStyle = '#0F172A';
      context.font = '900 26px Cairo, Arial';
      context.fillText(value, 500, y - 18);
    });

    const barcode = String(form.barcodeValue || 'CARD-000').toUpperCase();
    let x = 155;
    context.fillStyle = '#ffffff';
    context.fillRect(120, 940, 660, 130);
    context.strokeStyle = '#CBD5E1';
    context.strokeRect(120, 940, 660, 130);
    context.fillStyle = '#050816';
    barcode.split('').forEach((char, charIndex) => {
      const seed = char.charCodeAt(0) + charIndex;
      for (let i = 0; i < 6; i += 1) {
        const width = (seed + i) % 3 === 0 ? 5 : 2;
        const gap = (seed + i) % 2 === 0 ? 3 : 5;
        if ((seed + i) % 2 === 0) {
          context.fillRect(x, 965, width, 70);
        }
        x += width + gap;
      }
    });
    context.textAlign = 'center';
    context.direction = 'ltr';
    context.font = '700 22px monospace';
    context.fillText(barcode, 450, 1105);

    context.direction = 'rtl';
    context.fillStyle = '#64748B';
    context.font = '700 18px Cairo, Arial';
    context.fillText('يستخدم للسكان في الحضور والدخول والخروج', 690, 1145);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${form.memberName || 'member'}-membership-card.png`;
    link.click();
  };

  return (
    <section aria-labelledby="whatsapp-title">
      <PageHeader
        eyebrow="الأتمتة والواتساب"
        title="رسائل الاشتراك والتجديد"
        description="تجهيز رسائل واتساب تلقائية للعميل عند الاشتراك أو التجديد، مع كود الحضور القابل للسكان."
        icon={MessageCircle}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="size-6 text-panda-gold" aria-hidden="true" />
            <h2 className="font-display text-xl font-extrabold">إعداد الرسالة</h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-white/52">نوع العملية</span>
              <select
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-midnight-800 px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
              >
                <option value="new">اشتراك جديد</option>
                <option value="renew">تجديد اشتراك</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold text-white/52">رقم واتساب</span>
              <input
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                dir="ltr"
              />
            </label>
            {[
              ['gymName', 'اسم النادي'],
              ['memberName', 'اسم العميل'],
              ['planName', 'خطة الاشتراك'],
              ['barcodeValue', 'كود/باركود الحضور'],
              ['startDate', 'تاريخ البداية'],
              ['endDate', 'تاريخ الانتهاء'],
            ].map(([key, label]) => (
              <label key={key} className="block">
                <span className="text-xs font-bold text-white/52">{label}</span>
                <input
                  value={form[key]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-electric-cyan/25 bg-electric-blue/10 p-4 text-sm leading-7 text-electric-cyan">
            لاحقًا عند ربط الباك إند: الحدث `subscription.created` أو `subscription.renewed` سيستدعي WhatsApp Business API ويرسل الرسالة تلقائيًا.
          </div>
        </div>

        <aside className="glass-panel-strong rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Smartphone className="size-6 text-electric-cyan" aria-hidden="true" />
            <h2 className="font-display text-xl font-extrabold">معاينة واتساب</h2>
          </div>

          <div ref={cardRef} className="print-card mt-5">
            <div className="rounded-3xl bg-white p-5 text-midnight-950 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-16 place-items-center rounded-2xl bg-midnight-950 text-xl font-black text-electric-cyan">FG</div>
                <div className="text-end">
                  <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700">
                    {templates[form.type].label}
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold">{form.gymName}</h3>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {[
                  ['اسم العميل', form.memberName],
                  ['خطة الاشتراك', form.planName],
                  ['تاريخ البداية', form.startDate],
                  ['تاريخ الانتهاء', form.endDate],
                  ['كود الحضور', form.barcodeValue],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-slate-100 px-4 py-3">
                    <p className="text-xs font-extrabold text-slate-500">{label}</p>
                    <p className="mt-1 text-base font-extrabold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 p-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-slate-500">
                  <QrCode className="size-4" aria-hidden="true" />
                  كود الحضور
                </div>
                <Code39Barcode value={form.barcodeValue} />
              </div>

              <p className="mt-4 text-center text-xs font-bold text-slate-500">
                يستخدم للسكان في الحضور والدخول والخروج. يمكن طباعته ككارنيه مؤقت.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleDownloadImage}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-midnight-950"
            >
              <ImageDown className="size-5" aria-hidden="true" />
              تحميل صورة
            </button>
            <button
              type="button"
              onClick={handlePrintCard}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-panda-gold px-4 py-3 text-sm font-extrabold text-midnight-950"
            >
              <Printer className="size-5" aria-hidden="true" />
              PDF / طباعة
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-midnight-950"
          >
            <Send className="size-5" aria-hidden="true" />
            فتح واتساب بنص مختصر
          </a>
          <p className="mt-3 text-xs font-bold leading-6 text-white/44">
            في الإرسال التلقائي الحقيقي، سيتم إرسال الصورة أو PDF كمرفق عبر WhatsApp Business API.
          </p>
        </aside>
      </div>
    </section>
  );
}
