import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Check, Search, UserPlus, Users, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { members as initialMembers } from '../data/gymData.js';

const statusClass = {
  نشط: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
  'ينتهي قريبًا': 'border-panda-gold/30 bg-panda-gold/10 text-panda-gold',
  متأخر: 'border-rose-300/30 bg-rose-300/10 text-rose-200',
};

const filters = ['الكل', 'نشط', 'ينتهي قريبًا', 'متأخر'];

export default function Members() {
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    plan: 'شهري',
    status: 'نشط',
    expiresAt: 'ينتهي بعد ٣٠ يوم',
  });

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members.filter((member) => {
      const matchesFilter = activeFilter === 'الكل' || member.status === activeFilter;
      const matchesQuery = !normalizedQuery
        || member.name.toLowerCase().includes(normalizedQuery)
        || member.plan.toLowerCase().includes(normalizedQuery)
        || member.status.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, members, query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanName = form.name.trim();
    if (!cleanName) return;

    setMembers((currentMembers) => [
      {
        id: Date.now(),
        name: cleanName,
        plan: form.plan,
        status: form.status,
        expiresAt: form.expiresAt,
        attendance: 0,
      },
      ...currentMembers,
    ]);

    setForm({
      name: '',
      plan: 'شهري',
      status: 'نشط',
      expiresAt: 'ينتهي بعد ٣٠ يوم',
    });
    setActiveFilter('الكل');
    setQuery('');
    setIsModalOpen(false);
  };

  return (
    <section aria-labelledby="members-title">
      <PageHeader
        eyebrow="إدارة الأعضاء"
        title="الأعضاء والاشتراكات"
        description="متابعة حالة كل عضو، التجديدات القريبة، وعدد مرات الحضور من شاشة واحدة سريعة."
        icon={Users}
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
          <Search className="size-5 text-electric-cyan" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/42"
            placeholder="ابحث باسم العضو أو نوع الاشتراك"
            aria-label="بحث في الأعضاء"
          />
        </label>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="glass-panel-strong inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-panda-gold"
        >
          <UserPlus className="size-5" aria-hidden="true" />
          عضو جديد
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-extrabold transition ${
              activeFilter === filter
                ? 'border-panda-gold/40 bg-panda-gold/14 text-panda-gold'
                : 'border-white/10 bg-white/[0.06] text-white/58 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredMembers.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredMembers.map((member, index) => (
          <motion.article
            key={member.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="glass-panel rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold text-white/56">اشتراك {member.plan}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-extrabold ${statusClass[member.status]}`}>
                {member.status}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold text-white/48">انتهاء الاشتراك</p>
                <p className="mt-2 text-sm font-extrabold text-white">{member.expiresAt}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold text-white/48">حضور الشهر</p>
                <p className="mt-2 text-sm font-extrabold text-white">{member.attendance} زيارة</p>
              </div>
            </div>
          </motion.article>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-8 text-center">
          <p className="text-xl font-extrabold text-white">لا توجد نتائج مطابقة</p>
          <p className="mt-2 text-sm text-white/56">جرّب تغيير البحث أو اختيار فلتر آخر.</p>
        </div>
      )}

      <div className="glass-panel mt-5 flex items-center gap-3 rounded-2xl p-4 text-sm font-bold text-white/70">
        <CalendarClock className="size-5 text-panda-gold" aria-hidden="true" />
        يوجد {members.filter((member) => member.status !== 'نشط').length} اشتراك يحتاج متابعة خلال الأسبوع الحالي.
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/62 p-4 backdrop-blur-sm sm:place-items-center">
          <motion.form
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onSubmit={handleSubmit}
            className="glass-panel-strong w-full max-w-lg rounded-2xl p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white">إضافة عضو جديد</h2>
                <p className="mt-1 text-sm text-white/52">أدخل بيانات الاشتراك الأساسية.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70"
                aria-label="إغلاق"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="block">
                <span className="text-xs font-bold text-white/52">اسم العضو</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                  placeholder="مثال: محمد أحمد"
                  autoFocus
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold text-white/52">نوع الاشتراك</span>
                  <select
                    value={form.plan}
                    onChange={(event) => setForm((current) => ({ ...current, plan: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-midnight-800 px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                  >
                    <option>شهري</option>
                    <option>ذهبي</option>
                    <option>بلاتينيوم</option>
                    <option>سنوي</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-white/52">الحالة</span>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-midnight-800 px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                  >
                    <option>نشط</option>
                    <option>ينتهي قريبًا</option>
                    <option>متأخر</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-bold text-white/52">موعد انتهاء الاشتراك</span>
                <input
                  value={form.expiresAt}
                  onChange={(event) => setForm((current) => ({ ...current, expiresAt: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                  placeholder="ينتهي بعد ٣٠ يوم"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-panda-gold px-5 py-3 text-sm font-extrabold text-midnight-950"
            >
              <Check className="size-5" aria-hidden="true" />
              حفظ العضو
            </button>
          </motion.form>
        </div>
      ) : null}
    </section>
  );
}
