import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, CalendarCheck2, CircleDollarSign, Dumbbell, Globe2, Sparkles, Users } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import { GymContext } from '../App.jsx';

const formatNumber = new Intl.NumberFormat('ar-EG');

const barCharts = [
  {
    title: 'الأعضاء حسب النشاط',
    bars: [
      ['جيمناز', 42],
      ['فتنس', 28],
      ['كاراتيه', 18],
      ['PT', 12],
    ],
  },
  {
    title: 'الأعضاء حسب خطة الاشتراك',
    bars: [
      ['سنوي', 56],
      ['شهري', 31],
      ['حصص', 13],
    ],
  },
];

const donutSegments = [
  { label: 'نشط', value: 76, color: '#37D7FF' },
  { label: 'ينتهي قريبًا', value: 16, color: '#F8C14A' },
  { label: 'متأخر', value: 8, color: '#FB7185' },
];

const followUps = [
  ['الاشتراكات المنتهية', 'أعضاء اقترب اشتراكهم من الانتهاء خلال ١٠ أيام', 24, 'rose'],
  ['الأقساط المستحقة', 'أعضاء عليهم أقساط مستحقة', 8, 'gold'],
  ['متابعة الأعضاء', 'تذكير بالأعضاء تحت المتابعة', 12, 'blue'],
  ['طلبات تجديد الاشتراك', 'طلبات تجديد معلقة من التطبيق', 5, 'green'],
  ['أعياد الميلاد القادمة', 'أعضاء خلال ١٠ أيام', 17, 'blue'],
];

function BarChartPanel({ title, bars }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <h2 className="font-display text-xl font-extrabold text-white">{title}</h2>
      <div className="mt-5 space-y-4">
        {bars.map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between text-sm font-bold">
              <span className="text-white/70">{label}</span>
              <span className="text-electric-cyan">{value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-l from-electric-cyan to-panda-gold" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutPanel() {
  const conic = `conic-gradient(${donutSegments
    .reduce((acc, segment) => {
      const start = acc.total;
      const end = start + segment.value;
      acc.parts.push(`${segment.color} ${start}% ${end}%`);
      acc.total = end;
      return acc;
    }, { total: 0, parts: [] }).parts.join(', ')})`;

  return (
    <div className="glass-panel rounded-2xl p-5">
      <h2 className="font-display text-xl font-extrabold text-white">حالة الأعضاء</h2>
      <div className="mt-5 grid place-items-center">
        <div className="grid size-48 place-items-center rounded-full" style={{ background: conic }}>
          <div className="grid size-28 place-items-center rounded-full bg-midnight-950 text-center">
            <span className="text-3xl font-extrabold text-white">٧٦٪</span>
            <span className="text-xs font-bold text-white/48">نشط</span>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        {donutSegments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between rounded-2xl bg-white/[0.06] px-3 py-2 text-sm font-bold">
            <span className="flex items-center gap-2 text-white/70">
              <span className="size-3 rounded-full" style={{ background: segment.color }} />
              {segment.label}
            </span>
            <span className="text-white">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, stats, aiCommand } = useContext(GymContext);

  const cards = [
    {
      title: 'إجمالي الأعضاء',
      value: formatNumber.format(stats.totalMembers),
      helper: 'نمو مستقر في قاعدة العملاء خلال هذا الشهر.',
      icon: Users,
    },
    {
      title: 'الاشتراكات النشطة',
      value: formatNumber.format(stats.activeSubscriptions),
      helper: 'متابعة ذكية للتجديدات والتنبيهات القادمة.',
      icon: Dumbbell,
      accent: 'gold',
    },
    {
      title: 'إيراد اليوم',
      value: `${formatNumber.format(stats.dailyRevenue)} ج.م`,
      helper: 'يشمل الاشتراكات والمدفوعات والخدمات الإضافية.',
      icon: CircleDollarSign,
    },
    {
      title: 'حضور اليوم',
      value: formatNumber.format(stats.todayAttendance),
      helper: 'قراءة مباشرة لحركة الدخول داخل الصالة.',
      icon: CalendarCheck2,
      accent: 'gold',
    },
  ];

  return (
    <section aria-labelledby="dashboard-title">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-6 grid gap-5 xl:grid-cols-[1fr_380px] xl:items-end"
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-panda-gold/30 bg-panda-gold/10 px-3 py-1 text-sm font-bold text-panda-gold">
            <Sparkles className="size-4" aria-hidden="true" />
            لوحة التحكم الذكية
          </p>
          <h1 id="dashboard-title" className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            أهلاً يا {user}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
            إدارة شاملة للأعضاء والاشتراكات والحضور والمالية من مكان واحد، مع مركز أوامر عربي مدعوم بالذكاء الاصطناعي.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-extrabold text-white/78 transition hover:text-white"
          >
            <Globe2 className="size-4" aria-hidden="true" />
            عرض اللاندنج الخارجية
          </Link>
        </div>
        <div className="glass-panel-strong rounded-2xl p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white/58">مؤشر الأداء</p>
              <p className="mt-2 text-3xl font-extrabold text-white">٨٧٪</p>
            </div>
            <div className="grid size-14 place-items-center rounded-2xl bg-electric-blue/18 text-electric-cyan">
              <Activity className="size-7" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[87%] rounded-full bg-gradient-to-l from-electric-cyan to-panda-gold" />
          </div>
        </div>
      </motion.div>

      {aiCommand ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel mb-5 rounded-2xl p-4 text-sm font-semibold text-white/78"
        >
          الأمر الحالي: <span className="text-electric-cyan">{aiCommand}</span>
        </motion.div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">نبض النادي اليوم</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['تجديدات مستحقة', 'متأخرات مالية', 'جلسات PT'].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm text-white/56">{item}</p>
                <p className="mt-2 text-2xl font-extrabold text-white">{formatNumber.format([24, 8, 19][index])}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold">إعدادات النظام</h2>
          <p className="mt-4 text-sm leading-7 text-white/62">
            الوضع الداكن وواجهة RTL مفعّلان افتراضيًا، مع تصميم مهيأ لتطبيقات iOS وAndroid عبر Capacitor.
          </p>
          <p className="mt-5 rounded-2xl border border-panda-gold/30 bg-panda-gold/10 p-4 text-sm font-bold text-panda-gold">
            Developed by Mohamed Zaki - Panda Plus
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        <BarChartPanel {...barCharts[0]} />
        <BarChartPanel {...barCharts[1]} />
        <DonutPanel />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold text-white">متابعة كل شيء</h2>
          <div className="mt-5 grid gap-3">
            {followUps.map(([title, description, count, tone]) => (
              <div key={title} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div>
                  <p className="font-extrabold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/52">{description}</p>
                </div>
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold ${
                    tone === 'rose'
                      ? 'bg-rose-300/10 text-rose-200'
                      : tone === 'gold'
                        ? 'bg-panda-gold/10 text-panda-gold'
                        : tone === 'green'
                          ? 'bg-emerald-300/10 text-emerald-200'
                          : 'bg-electric-blue/10 text-electric-cyan'
                  }`}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-display text-xl font-extrabold text-white">مؤشر الأسبوع</h2>
          <div className="mt-5 grid h-[330px] grid-cols-7 items-end gap-3 border-b border-white/10 pb-4">
            {[38, 52, 44, 68, 59, 74, 63].map((height, index) => (
              <div key={height} className="flex h-full flex-col justify-end gap-2">
                <div
                  className="rounded-t-2xl bg-gradient-to-t from-electric-blue to-panda-gold shadow-glass"
                  style={{ height: `${height}%` }}
                />
                <p className="text-center text-xs font-bold text-white/48">{['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'][index]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ['متوسط الحضور', '٦٤٪'],
              ['أفضل يوم', 'الخميس'],
              ['تحسن الإيراد', '+١٨٪'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/[0.06] p-4">
                <p className="text-xs font-bold text-white/45">{label}</p>
                <p className="mt-1 text-xl font-extrabold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
