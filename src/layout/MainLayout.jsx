import React, { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  BarChart3,
  Bot,
  Building2,
  CircleDollarSign,
  CreditCard,
  Crown,
  Database,
  Dumbbell,
  Globe2,
  Home,
  IdCard,
  Printer,
  LogOut,
  Menu,
  MessageCircle,
  PanelRightClose,
  PanelRightOpen,
  Palette,
  Search,
  Settings,
  Sparkles,
  TableProperties,
  Users,
  X,
} from 'lucide-react';
import { GymContext } from '../App.jsx';
import useScrollToTop from '../hooks/useScrollToTop.js';
import useAiCommand from '../hooks/useAiCommand.js';
import BrandMark from '../components/BrandMark.jsx';

const navItems = [
  { label: 'الرئيسية', to: '/app', icon: Home },
  { label: 'الأعضاء', to: '/members', icon: Users },
  { label: 'المالية', to: '/finance', icon: CircleDollarSign },
  { label: 'المزيد', to: '/more', icon: Menu },
];

const sidebarGroups = [
  {
    label: 'التشغيل',
    items: [
      { label: 'الرئيسية', to: '/app', icon: Home },
      { label: 'الأعضاء', to: '/members', icon: Users },
      { label: 'المالية', to: '/finance', icon: CircleDollarSign },
      { label: 'التقارير', to: '/reports', icon: BarChart3 },
      { label: 'الاشتراكات', to: '/basic-data/plans', icon: Dumbbell },
      { label: 'الموظفين', to: '/basic-data/employees', icon: IdCard },
    ],
  },
  {
    label: 'الإدارة',
    items: [
      { label: 'البيانات الأساسية', to: '/basic-data', icon: TableProperties },
      { label: 'هوية النادي', to: '/tenant-branding', icon: Palette },
      { label: 'الإعدادات', to: '/basic-data/settings', icon: Settings },
      { label: 'بوابات الدفع', to: '/payment-gateways', icon: CreditCard },
      { label: 'الطباعة والباركود', to: '/print-settings', icon: Printer },
      { label: 'الدول والأنشطة', to: '/localization-settings', icon: Globe2 },
      { label: 'الصلاحيات', to: '/permissions', icon: IdCard },
      { label: 'واتساب تلقائي', to: '/whatsapp-automation', icon: MessageCircle },
      { label: 'المزيد', to: '/more', icon: Menu },
    ],
  },
  {
    label: 'Panda Plus',
    items: [
      { label: 'الموقع الخارجي', to: '/', icon: Globe2 },
      { label: 'لوحة الماستر', to: '/master-console', icon: Crown },
      { label: 'النوادي', to: '/master-console', icon: Building2 },
      { label: 'الداتا والربط', to: '/basic-data/core', icon: Database },
    ],
  },
];

export default function MainLayout() {
  const { aiCommand, setAiCommand, developer, auth, logout } = useContext(GymContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const aiResult = useAiCommand(aiCommand);
  useScrollToTop();

  const suggestionCommands = ['مين اشتراكه خلص؟', 'تقرير المصاريف', 'تقرير الإيرادات'];

  const toneClass = {
    warning: 'border-panda-gold/30 bg-panda-gold/10 text-panda-gold',
    danger: 'border-rose-300/30 bg-rose-300/10 text-rose-200',
    success: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
    info: 'border-electric-cyan/30 bg-electric-blue/10 text-electric-cyan',
  }[aiResult?.tone || 'info'];

  return (
    <div className="rtl min-h-screen overflow-x-hidden bg-midnight-radial bg-midnight-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_36%)]" />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-40 hidden border-l border-white/10 bg-midnight-950/82 backdrop-blur-2xl transition-all duration-300 md:block ${
          isSidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        <div className="flex h-full flex-col p-3">
          <div className="mb-4 flex items-center justify-between gap-2">
            {isSidebarOpen ? <BrandMark className="size-11" showText /> : <BrandMark className="size-11" />}
            <button
              type="button"
              onClick={() => setIsSidebarOpen((current) => !current)}
              className="grid size-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/62 hover:text-white"
              aria-label={isSidebarOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
            >
              {isSidebarOpen ? <PanelRightClose className="size-5" aria-hidden="true" /> : <PanelRightOpen className="size-5" aria-hidden="true" />}
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pe-1">
            {sidebarGroups.map((group) => (
              <div key={group.label} className="mb-5">
                {isSidebarOpen ? <p className="mb-2 px-3 text-xs font-extrabold text-white/36">{group.label}</p> : null}
                <div className="grid gap-1">
                  {group.items.map(({ label, to, icon: Icon }) => (
                    <NavLink
                      key={`${group.label}-${to}-${label}`}
                      to={to}
                      title={label}
                      className={({ isActive }) =>
                        `flex h-12 items-center gap-3 rounded-2xl px-3 text-sm font-extrabold transition ${
                          isActive ? 'glass-panel-strong text-panda-gold' : 'text-white/54 hover:bg-white/[0.07] hover:text-white'
                        } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`
                      }
                    >
                      <Icon className="size-5 shrink-0" aria-hidden="true" />
                      {isSidebarOpen ? <span className="truncate">{label}</span> : null}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={logout}
            className={`mt-3 flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 text-sm font-extrabold text-white/58 hover:text-rose-200 ${
              isSidebarOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <LogOut className="size-5" aria-hidden="true" />
            {isSidebarOpen ? <span>تسجيل الخروج</span> : null}
          </button>
        </div>
      </aside>

      <header
        className={`sticky top-0 z-30 border-b border-white/10 bg-midnight-950/62 px-4 py-3 backdrop-blur-2xl transition-all duration-300 ${
          isSidebarOpen ? 'md:mr-72' : 'md:mr-20'
        }`}
      >
        <div className="mx-auto w-full max-w-none">
          <div className="flex items-center gap-3">
            <BrandMark className="size-11" />
            <div className="hidden min-w-32 sm:block">
              <p className="text-xs font-bold text-white/42">{auth.branch}</p>
              <p className="truncate text-sm font-extrabold text-white">{auth.gymCode || 'Fitness Gym'}</p>
            </div>
            <label className="glass-panel-strong flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3">
              <Search className="size-5 shrink-0 text-electric-cyan" aria-hidden="true" />
              <input
                value={aiCommand}
                onChange={(event) => setAiCommand(event.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/42"
                placeholder="اسأل الذكاء الاصطناعي: مين اشتراكه خلص؟ أو تقرير المصاريف"
                type="search"
                aria-label="مركز أوامر الذكاء الاصطناعي"
              />
              {aiCommand ? (
                <button
                  type="button"
                  onClick={() => setAiCommand('')}
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-white/60"
                  aria-label="مسح الأمر"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </label>
            <BarChart3 className="hidden size-6 text-panda-gold lg:block" aria-hidden="true" />
            <button
              type="button"
              onClick={logout}
              className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/60 transition hover:text-rose-200 md:hidden"
              aria-label="تسجيل الخروج"
            >
              <LogOut className="size-5" aria-hidden="true" />
            </button>
          </div>

          {aiCommand && aiResult ? (
            <div className="glass-panel-strong mt-3 rounded-2xl p-4 shadow-glass">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-electric-blue/16 text-electric-cyan">
                  <Bot className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-extrabold text-white">{aiResult.title}</h2>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${toneClass}`}>
                      <Sparkles className="me-1 inline size-3" aria-hidden="true" />
                      نتيجة ذكية
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/64">{aiResult.summary}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {aiResult.items.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/78">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 hidden gap-2 sm:flex">
              {suggestionCommands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => setAiCommand(command)}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-white/54 transition hover:text-white"
                >
                  {command}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:mr-72' : 'md:mr-20'}`}>
        <main className="relative z-10 mx-auto w-full max-w-none px-4 pb-28 pt-6 md:px-6 md:pb-12 xl:px-8">
          <Outlet />
        </main>

        <footer className="relative z-10 mx-auto hidden w-full max-w-none px-6 pb-6 text-sm text-white/52 md:block xl:px-8">
          Developed by {developer}
        </footer>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-midnight-950/72 px-3 pb-4 pt-2 backdrop-blur-2xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold transition ${
                  isActive ? 'glass-panel-strong text-panda-gold' : 'text-white/52 hover:text-white'
                }`
              }
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] font-semibold text-white/42">Developed by {developer}</p>
      </nav>
    </div>
  );
}
