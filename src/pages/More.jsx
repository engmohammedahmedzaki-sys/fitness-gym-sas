import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Bot, Crown, Database, FileText, MessageCircle, Palette, Settings, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { GymContext } from '../App.jsx';
import { quickActions } from '../data/gymData.js';

const icons = [Bot, FileText, MessageCircle, Database, Bell, ShieldCheck];

export default function More() {
  const { developer } = useContext(GymContext);

  return (
    <section aria-labelledby="more-title">
      <PageHeader
        eyebrow="المزيد والإعدادات"
        title="مركز تشغيل Fitness Gym"
        description="اختصارات الإدارة، إعدادات النظام، ومعلومات المطوّر في مكان واحد واضح."
        icon={Settings}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link className="glass-panel flex min-h-28 items-center gap-4 rounded-2xl p-5 text-start transition hover:bg-white/[0.14]" to="/master-console">
          <span className="grid size-12 place-items-center rounded-2xl bg-panda-gold/14 text-panda-gold">
            <Crown className="size-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-extrabold text-white">لوحة الماستر</span>
            <span className="mt-1 block text-xs font-bold text-white/45">إدارة النوادي والاشتراكات</span>
          </span>
        </Link>
        <Link className="glass-panel flex min-h-28 items-center gap-4 rounded-2xl p-5 text-start transition hover:bg-white/[0.14]" to="/tenant-branding">
          <span className="grid size-12 place-items-center rounded-2xl bg-electric-blue/14 text-electric-cyan">
            <Palette className="size-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-extrabold text-white">هوية النادي</span>
            <span className="mt-1 block text-xs font-bold text-white/45">اسم، لوجو، ألوان الفرع</span>
          </span>
        </Link>
        <Link className="glass-panel flex min-h-28 items-center gap-4 rounded-2xl p-5 text-start transition hover:bg-white/[0.14]" to="/whatsapp-automation">
          <span className="grid size-12 place-items-center rounded-2xl bg-emerald-300/14 text-emerald-200">
            <MessageCircle className="size-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-extrabold text-white">واتساب تلقائي</span>
            <span className="mt-1 block text-xs font-bold text-white/45">اشتراك، تجديد، وكود حضور</span>
          </span>
        </Link>
        <Link className="glass-panel flex min-h-28 items-center gap-4 rounded-2xl p-5 text-start transition hover:bg-white/[0.14]" to="/basic-data">
          <span className="grid size-12 place-items-center rounded-2xl bg-panda-gold/14 text-panda-gold">
            <Database className="size-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-extrabold text-white">البيانات الأساسية</span>
            <span className="mt-1 block text-xs font-bold text-white/45">مديول التأسيس الرئيسي</span>
          </span>
        </Link>
        {quickActions.map((action, index) => {
          const Icon = icons[index];
          return (
            <button key={action} className="glass-panel flex min-h-28 items-center gap-4 rounded-2xl p-5 text-start transition hover:bg-white/[0.14]">
              <span className="grid size-12 place-items-center rounded-2xl bg-electric-blue/14 text-electric-cyan">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="font-extrabold text-white">{action}</span>
            </button>
          );
        })}
      </div>

      <div className="glass-panel-strong mt-5 rounded-2xl p-5">
        <h2 className="font-display text-xl font-extrabold">بيانات النظام</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-bold text-white/48">الوضع</p>
            <p className="mt-2 font-extrabold text-emerald-200">جاهز للتطوير</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-bold text-white/48">اللغة</p>
            <p className="mt-2 font-extrabold text-white">العربية RTL</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-bold text-white/48">الموبايل</p>
            <p className="mt-2 font-extrabold text-white">مهيأ لـ Capacitor</p>
          </div>
        </div>
        <p className="mt-5 rounded-2xl border border-panda-gold/30 bg-panda-gold/10 p-4 text-sm font-extrabold text-panda-gold">
          Developed by {developer}
        </p>
      </div>
    </section>
  );
}
