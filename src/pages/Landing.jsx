import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  Check,
  CreditCard,
  Crown,
  Dumbbell,
  FileSpreadsheet,
  Globe2,
  LockKeyhole,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import BrandMark from '../components/BrandMark.jsx';
import { saasPlans } from '../data/tenants.js';

const featureBlocks = [
  {
    title: 'تشغيل النادي من شاشة واحدة',
    description: 'الأعضاء، الاشتراكات، الحضور، المصروفات، الإيرادات، الموظفين، الخزائن، والاختبارات في تجربة عربية RTL.',
    icon: Dumbbell,
  },
  {
    title: 'باركود وكروت قابلة للطباعة',
    description: 'توليد كارت جديد أو ربط كارت جاهز بالاسكان، مع حضور وانصراف للأعضاء والموظفين.',
    icon: QrCode,
  },
  {
    title: 'واتساب تلقائي بمرفقات',
    description: 'إرسال صورة أو PDF بكارت العضوية والباركود عند الاشتراك أو التجديد، جاهز للطباعة أو الحضور.',
    icon: MessageCircle,
  },
  {
    title: 'SaaS لإعادة البيع',
    description: 'أنت الماستر: تعمل نادي جديد، تحدد الباقة، الصلاحيات، اللوجو، وتفصل بيانات كل عميل.',
    icon: Crown,
  },
  {
    title: 'تقارير وتصدير احترافي',
    description: 'مبيعات، أرباح وخسائر، مخزون، عملاء، ضرائب، ومصاريف شهرية مع PDF وExcel وJSON.',
    icon: FileSpreadsheet,
  },
  {
    title: 'دول وعملات متعددة',
    description: 'مصر، السعودية، الإمارات، الكويت، مع عملة وضريبة وسعر مناسب حسب بلد العميل.',
    icon: Globe2,
  },
];

const paymentGateways = ['Paymob', 'Fawaterk'];

export default function Landing() {
  return (
    <main className="rtl min-h-screen overflow-hidden bg-midnight-radial bg-midnight-950 text-white">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-midnight-950/62 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark className="size-11" />
            <span>
              <span className="block text-sm font-extrabold">Fitness Gym</span>
              <span className="block text-[11px] font-bold text-panda-gold">Panda Plus SaaS</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-bold text-white/62 md:flex">
            <a href="#features" className="hover:text-white">المميزات</a>
            <a href="#pricing" className="hover:text-white">الباقات</a>
            <a href="#payments" className="hover:text-white">الدفع</a>
            <Link to="/about" className="hover:text-white">من نحن</Link>
            <Link to="/contact" className="hover:text-white">تواصل معنا</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-extrabold text-white/82 transition hover:text-white">
              دخول
            </Link>
            <Link to="/signup?plan=trial" className="hidden rounded-2xl bg-panda-gold px-4 py-2 text-sm font-extrabold text-midnight-950 shadow-glass sm:inline-flex">
              اشترك
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[92vh] overflow-hidden px-4 pt-28 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(0,163,255,0.28),transparent_32%),radial-gradient(circle_at_18%_86%,rgba(248,193,74,0.18),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight-950 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 py-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-panda-gold/30 bg-panda-gold/10 px-4 py-2 text-sm font-extrabold text-panda-gold">
              <Sparkles className="size-4" aria-hidden="true" />
              نظام إدارة نوادي عربي قابل لإعادة البيع
            </span>
            <h1 className="mt-7 max-w-4xl font-display text-4xl font-black leading-tight sm:text-6xl">
              شغّل الجيم، بيع الاشتراكات، وابعث الكارنيه بالواتساب في نفس اللحظة.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              Fitness Gym منصة SaaS لإدارة العضويات والاشتراكات والحضور والمالية، مع باركود، صلاحيات، بوابات دفع Paymob وFawaterk،
              ولوحة ماستر لإدارة نوادي عملائك من غير ما تسلم السورس كود.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup?plan=trial" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-electric-blue to-panda-gold px-5 py-3 text-sm font-extrabold text-midnight-950 shadow-glass">
                جرّب 14 يوم
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-extrabold text-white">
                دخول مستخدم حالي
                <LockKeyhole className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {['عزل بيانات لكل نادي', 'واتساب PDF / صورة', 'تحكم كامل في الباقات'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-extrabold text-white/76 backdrop-blur-xl">
                  <Check className="me-2 inline size-4 text-emerald-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="glass-panel-strong rounded-[2rem] p-4 shadow-glass">
              <div className="rounded-[1.5rem] border border-white/10 bg-midnight-950/70 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white/44">لوحة الماستر</p>
                    <h2 className="font-display text-2xl font-black">Panda Plus SaaS</h2>
                  </div>
                  <BrandMark className="size-12" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['النوادي النشطة', '24', Crown],
                    ['إيراد الشهر', '184,500 ج.م', BarChart3],
                    ['كروت مرسلة', '1,284', QrCode],
                    ['طلبات اشتراك', '36', CreditCard],
                  ].map(([label, value, Icon]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                      <Icon className="size-5 text-electric-cyan" aria-hidden="true" />
                      <p className="mt-4 text-xs font-bold text-white/48">{label}</p>
                      <p className="mt-1 text-2xl font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-panda-gold/30 bg-panda-gold/10 p-4">
                  <p className="text-sm font-extrabold text-panda-gold">آخر عملية</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-white/70">تم إنشاء نادي جديد، تفعيل بوابة الدفع، وإرسال كارت العضوية PDF بالباركود للعميل.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold text-electric-cyan">المميزات</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">مش نسخة من السيستم القديم، دي تجربة معمولة صح.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featureBlocks.map(({ title, description, icon: Icon }) => (
              <article key={title} className="glass-panel rounded-3xl p-5">
                <span className="grid size-12 place-items-center rounded-2xl bg-electric-blue/14 text-electric-cyan">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/58">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-extrabold text-panda-gold">الباقات</p>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">أسعار قابلة للتحكم من لوحة الماستر.</h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/58">
                الاسم، السعر، المتاح، غير المتاح، وعدد الفروع والمستخدمين هيتداروا من داخل النظام.
              </p>
            </div>
            <Link to="/master-console" className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-extrabold text-white/82">
              إدارة الباقات
              <ShieldCheck className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {saasPlans.map((plan) => (
              <article
                key={plan.id}
                className={`relative rounded-3xl border p-5 backdrop-blur-xl ${
                  plan.isPopular ? 'border-panda-gold/60 bg-panda-gold/10 shadow-glass' : 'border-white/10 bg-white/[0.06]'
                }`}
              >
                {plan.isPopular ? (
                  <span className="absolute left-5 top-5 rounded-full bg-panda-gold px-3 py-1 text-xs font-black text-midnight-950">الأكثر طلباً</span>
                ) : null}
                <h3 className="font-display text-2xl font-black">{plan.name}</h3>
                <p className="mt-2 text-sm font-bold text-white/50">{plan.subtitle}</p>
                <p className="mt-6 text-3xl font-black text-white">
                  {plan.price ? `${plan.price.toLocaleString('ar-EG')} ج.م` : 'مجاني'}
                  <span className="text-sm font-bold text-white/45"> / {plan.billing}</span>
                </p>
                <div className="mt-5 grid gap-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-bold text-white/70">
                      <BadgeCheck className="size-4 shrink-0 text-emerald-200" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.unavailable.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-bold text-white/34">
                      <X className="size-4 shrink-0 text-rose-300" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/signup?plan=${plan.id}`}
                  className={`mt-6 flex h-12 items-center justify-center rounded-2xl text-sm font-black ${
                    plan.isPopular ? 'bg-panda-gold text-midnight-950' : 'bg-white text-midnight-950'
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="payments" className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold text-electric-cyan">بوابات الدفع</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">الدفع موجود: Paymob أو Fawaterk.</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/58">
              العميل يختار الباقة، يدفع، والسيستم يفتح النادي تلقائياً أو يجهز طلب تفعيل للمراجعة حسب إعدادات الماستر.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {paymentGateways.map((gateway) => (
              <div key={gateway} className="glass-panel-strong rounded-3xl p-6">
                <CreditCard className="size-8 text-panda-gold" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-black">{gateway}</h3>
                <p className="mt-2 text-sm font-bold text-white/52">دفع إلكتروني، فواتير، وتتبع حالة الاشتراك داخل لوحة الماستر.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-midnight-950/70 px-4 py-10 backdrop-blur-2xl sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
            <div className="glass-panel rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <BrandMark className="size-12" />
                <div>
                  <p className="font-display text-xl font-black text-white">Fitness Gym</p>
                  <p className="text-xs font-extrabold text-panda-gold">Panda Plus SaaS</p>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-white/56">
                منصة عربية لإدارة النوادي والعضويات والاشتراكات والحضور والمالية، مع ماستر لإعادة البيع وتحكم كامل في الباقات والبوابات.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {paymentGateways.map((gateway) => (
                  <span key={gateway} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-extrabold text-white/64">
                    {gateway}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-display text-lg font-black text-white">المنتج</h3>
              <div className="mt-4 grid gap-3 text-sm font-bold text-white/54">
                <a href="#features" className="hover:text-white">المميزات</a>
                <a href="#pricing" className="hover:text-white">الباقات</a>
                <a href="#payments" className="hover:text-white">بوابات الدفع</a>
                <Link to="/signup?plan=trial" className="hover:text-white">تجربة 14 يوم</Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-display text-lg font-black text-white">الشركة</h3>
              <div className="mt-4 grid gap-3 text-sm font-bold text-white/54">
                <Link to="/about" className="hover:text-white">من نحن</Link>
                <Link to="/contact" className="hover:text-white">تواصل معنا</Link>
                <Link to="/login" className="hover:text-white">تسجيل الدخول</Link>
                <Link to="/master-console" className="hover:text-white">لوحة الماستر</Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-display text-lg font-black text-white">السياسات</h3>
              <div className="mt-4 grid gap-3 text-sm font-bold text-white/54">
                <Link to="/privacy" className="hover:text-white">سياسة الخصوصية</Link>
                <Link to="/terms" className="hover:text-white">الشروط والأحكام</Link>
                <Link to="/refund-policy" className="hover:text-white">سياسة الاسترجاع</Link>
                <Link to="/contact" className="hover:text-white">الدعم والمبيعات</Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white/50 md:flex-row md:items-center">
            <p>Developed by Mohamed Zaki - Panda Plus</p>
            <p>© 2026 Fitness Gym SaaS. جميع الحقوق محفوظة.</p>
            <Link to="/signup?plan=trial" className="rounded-2xl bg-panda-gold px-4 py-2 text-center font-black text-midnight-950">
              ابدأ التجربة الآن
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
