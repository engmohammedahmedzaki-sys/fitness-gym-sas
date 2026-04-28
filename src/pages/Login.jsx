import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Eye, EyeOff, Globe2, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { GymContext } from '../App.jsx';
import BrandMark from '../components/BrandMark.jsx';

export default function Login() {
  const { auth, login } = useContext(GymContext);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    gymCode: 'Fitness Gym',
    username: 'admin',
    password: 'admin',
    branch: 'الفرع الرئيسي',
    language: 'العربية',
    remember: true,
  });

  if (auth.isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login(form);
  };

  return (
    <main className="rtl grid min-h-screen place-items-center overflow-hidden bg-midnight-radial bg-midnight-950 px-4 py-8 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(0,163,255,0.18),transparent_35%,rgba(248,193,74,0.14))]" />

      <motion.form
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        onSubmit={handleSubmit}
        className="glass-panel-strong relative z-10 w-full max-w-xl rounded-3xl p-6 shadow-glass sm:p-8"
      >
        <div className="flex justify-center">
          <BrandMark className="size-24" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-bold text-panda-gold">Fitness Gym SaaS</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">تسجيل الدخول للنظام</h1>
          <p className="mt-3 text-sm leading-7 text-white/58">بوابة آمنة لإدارة الفروع والعضويات والاشتراكات.</p>
        </div>

        <div className="mt-7 grid gap-4">
          <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
            <Building2 className="size-5 text-electric-cyan" aria-hidden="true" />
            <input
              value={form.gymCode}
              onChange={(event) => setForm((current) => ({ ...current, gymCode: event.target.value }))}
              className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/42"
              placeholder="اسم النظام أو كود الجيم"
              aria-label="اسم النظام أو كود الجيم"
            />
          </label>

          <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
            <UserRound className="size-5 text-electric-cyan" aria-hidden="true" />
            <input
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
              className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/42"
              placeholder="اسم المستخدم"
              aria-label="اسم المستخدم"
            />
          </label>

          <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
            <LockKeyhole className="size-5 text-electric-cyan" aria-hidden="true" />
            <input
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/42"
              placeholder="كلمة المرور"
              type={showPassword ? 'text' : 'password'}
              aria-label="كلمة المرور"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white/60"
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
            >
              {showPassword ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
            </button>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
              <ShieldCheck className="size-5 text-panda-gold" aria-hidden="true" />
              <select
                value={form.branch}
                onChange={(event) => setForm((current) => ({ ...current, branch: event.target.value }))}
                className="w-full bg-midnight-800 text-sm font-bold text-white outline-none"
                aria-label="اختيار الفرع"
              >
                <option>الفرع الرئيسي</option>
                <option>فرع التجمع</option>
                <option>فرع أكتوبر</option>
              </select>
            </label>

            <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
              <Globe2 className="size-5 text-panda-gold" aria-hidden="true" />
              <select
                value={form.language}
                onChange={(event) => setForm((current) => ({ ...current, language: event.target.value }))}
                className="w-full bg-midnight-800 text-sm font-bold text-white outline-none"
                aria-label="اختيار اللغة"
              >
                <option>العربية</option>
                <option>English</option>
              </select>
            </label>
          </div>
        </div>

        <label className="mt-5 flex items-center gap-3 text-sm font-bold text-white/70">
          <input
            checked={form.remember}
            onChange={(event) => setForm((current) => ({ ...current, remember: event.target.checked }))}
            className="size-5 accent-electric-blue"
            type="checkbox"
          />
          تذكرني على هذا الجهاز
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-gradient-to-l from-electric-blue to-panda-gold px-5 py-4 text-base font-extrabold text-midnight-950 shadow-glass"
        >
          تسجيل الدخول
        </button>

        <p className="mt-5 text-center text-xs font-bold text-white/42">Developed by Mohamed Zaki - Panda Plus</p>
      </motion.form>
    </main>
  );
}
