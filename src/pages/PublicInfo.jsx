import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';

const pages = {
  about: {
    eyebrow: 'من نحن',
    title: 'Panda Plus تبني Fitness Gym كنظام SaaS عربي لإدارة النوادي.',
    description:
      'نحن نبني منصة عملية لإدارة العضويات والاشتراكات والحضور والمالية، مع قابلية إعادة البيع للنوادي الأخرى بدون تسليم السورس كود.',
    points: ['تصميم عربي RTL من البداية', 'إدارة فروع ونوادي متعددة', 'باركود وكروت عضوية قابلة للطباعة', 'لوحة ماستر للتحكم في العملاء والباقات'],
  },
  contact: {
    eyebrow: 'تواصل معنا',
    title: 'جاهز تشغل ناديك أو تبدأ نسخة إعادة بيع؟',
    description: 'ابعتلنا بياناتك وهنرتب معاك تفعيل النظام، بوابة الدفع، الباقة المناسبة، وتجهيز هوية النادي.',
    points: ['واتساب للدعم والمبيعات', 'إعداد Paymob أو Fawaterk', 'تجهيز الهوية والفروع', 'مساعدة في نقل البيانات'],
  },
  privacy: {
    eyebrow: 'سياسة الخصوصية',
    title: 'بيانات النوادي والأعضاء يتم التعامل معها كأصل حساس.',
    description:
      'النظام مصمم لعزل بيانات كل نادي، وتقليل الوصول غير الضروري، وحماية معلومات الأعضاء والحضور والمدفوعات حسب صلاحيات المستخدم.',
    points: ['عزل بيانات كل نادي عن الآخر', 'صلاحيات حسب الدور الوظيفي', 'عدم مشاركة بيانات العملاء مع أطراف غير لازمة للتشغيل', 'إمكانية التصدير والنسخ الاحتياطي حسب الخطة'],
  },
  terms: {
    eyebrow: 'الشروط والأحكام',
    title: 'استخدام النظام يتم كباقة اشتراك SaaS وليس بيعاً للسورس كود.',
    description:
      'يحصل العميل على صلاحية استخدام وإدارة ناديه داخل المنصة، مع الالتزام بعدم إساءة الاستخدام أو محاولة نسخ أو إعادة توزيع النظام.',
    points: ['الاشتراك يمنح حق استخدام لا ملكية للكود', 'كل نادي مسؤول عن دقة بياناته', 'قد تختلف المميزات حسب الباقة', 'يحق للماستر إيقاف الحساب عند مخالفة شروط الاستخدام'],
  },
  refund: {
    eyebrow: 'سياسة الاسترجاع',
    title: 'الاسترجاع يعتمد على حالة التفعيل واستخدام الخدمة.',
    description:
      'يمكن مراجعة طلبات الاسترجاع خلال فترة محددة قبل أو بعد التفعيل حسب الباقة وطبيعة التجهيزات التي تمت للنادي.',
    points: ['التجربة المجانية لا تحتاج استرجاع', 'رسوم الإعداد المخصص قد تكون غير قابلة للاسترداد', 'اشتراكات البوابات الخارجية تخضع لشروط مزود الدفع', 'طلبات الاسترجاع تراجع من لوحة الماستر'],
  },
};

export default function PublicInfo({ type = 'about' }) {
  const page = pages[type] || pages.about;

  return (
    <main className="rtl min-h-screen bg-midnight-radial bg-midnight-950 text-white">
      <header className="border-b border-white/10 bg-midnight-950/72 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark className="size-11" />
            <span className="font-extrabold">Fitness Gym</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-extrabold text-white/76">
            <ArrowRight className="size-4" aria-hidden="true" />
            الرئيسية
          </Link>
        </div>
      </header>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <article className="glass-panel-strong rounded-3xl p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-panda-gold/30 bg-panda-gold/10 px-4 py-2 text-sm font-extrabold text-panda-gold">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {page.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-3xl font-black leading-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-5 text-base font-semibold leading-8 text-white/62">{page.description}</p>
            <div className="mt-8 grid gap-3">
              {page.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-white/72">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-200" aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="glass-panel rounded-3xl p-6">
            <h2 className="font-display text-2xl font-black">بيانات التواصل</h2>
            <div className="mt-5 grid gap-3">
              <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-extrabold text-white/72" href="https://wa.me/201000000000">
                <MessageCircle className="size-5 text-emerald-200" aria-hidden="true" />
                واتساب المبيعات
              </a>
              <a className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-extrabold text-white/72" href="mailto:sales@pandaplus.app">
                <Mail className="size-5 text-electric-cyan" aria-hidden="true" />
                sales@pandaplus.app
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-extrabold text-white/72">
                <Phone className="size-5 text-panda-gold" aria-hidden="true" />
                رقم التواصل يحدد من لوحة الماستر
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-extrabold text-white/72">
                <MapPin className="size-5 text-rose-200" aria-hidden="true" />
                خدمة Online للنوادي والفروع
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
