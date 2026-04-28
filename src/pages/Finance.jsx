import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, ChartNoAxesColumnIncreasing, Check, CircleDollarSign, Plus, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { financeRows as initialFinanceRows } from '../data/gymData.js';

const formatCurrency = new Intl.NumberFormat('ar-EG');
const financeFilters = ['الكل', 'دخل', 'مصروف'];

export default function Finance() {
  const [financeRows, setFinanceRows] = useState(initialFinanceRows);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    label: '',
    value: '',
    type: 'دخل',
  });

  const filteredRows = useMemo(
    () => financeRows.filter((row) => activeFilter === 'الكل' || row.type === activeFilter),
    [activeFilter, financeRows],
  );

  const income = financeRows.filter((row) => row.type === 'دخل').reduce((sum, row) => sum + row.value, 0);
  const expenses = financeRows.filter((row) => row.type === 'مصروف').reduce((sum, row) => sum + row.value, 0);
  const net = income - expenses;

  const handleSubmit = (event) => {
    event.preventDefault();

    const label = form.label.trim();
    const value = Number(form.value);
    if (!label || !Number.isFinite(value) || value <= 0) return;

    setFinanceRows((currentRows) => [
      {
        label,
        value,
        type: form.type,
      },
      ...currentRows,
    ]);
    setForm({ label: '', value: '', type: 'دخل' });
    setActiveFilter('الكل');
    setIsModalOpen(false);
  };

  return (
    <section aria-labelledby="finance-title">
      <PageHeader
        eyebrow="المالية والتقارير"
        title="إيرادات ومصروفات النادي"
        description="ملخص مالي سريع يساعدك تشوف صافي اليوم، مصادر الدخل، وأهم المصروفات بدون تعقيد."
        icon={CircleDollarSign}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {financeFilters.map((filter) => (
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
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="glass-panel-strong inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-panda-gold"
        >
          <Plus className="size-5" aria-hidden="true" />
          حركة جديدة
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['إجمالي الدخل', income, ArrowUpRight, 'text-emerald-200'],
          ['إجمالي المصروفات', expenses, ArrowDownLeft, 'text-rose-200'],
          ['صافي اليوم', net, ChartNoAxesColumnIncreasing, 'text-panda-gold'],
        ].map(([label, value, Icon, color]) => (
          <div key={label} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white/56">{label}</p>
              <Icon className={`size-5 ${color}`} aria-hidden="true" />
            </div>
            <p className="mt-4 text-3xl font-extrabold text-white">{formatCurrency.format(value)} ج.م</p>
          </div>
        ))}
      </div>

      <div className="glass-panel mt-5 rounded-2xl p-5">
        <h2 className="font-display text-xl font-extrabold">حركة اليوم</h2>
        <div className="mt-4 space-y-3">
          {filteredRows.map((row, index) => (
            <motion.div
              key={`${row.label}-${index}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4"
            >
              <div>
                <p className="font-extrabold text-white">{row.label}</p>
                <p className="mt-1 text-xs font-bold text-white/45">{row.type}</p>
              </div>
              <p className={row.type === 'دخل' ? 'font-extrabold text-emerald-200' : 'font-extrabold text-rose-200'}>
                {formatCurrency.format(row.value)} ج.م
              </p>
            </motion.div>
          ))}
        </div>
        {!filteredRows.length ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center">
            <p className="font-extrabold text-white">لا توجد حركات في هذا الفلتر</p>
            <p className="mt-2 text-sm text-white/52">أضف حركة جديدة أو اختر فلترًا آخر.</p>
          </div>
        ) : null}
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
                <h2 className="font-display text-2xl font-extrabold text-white">إضافة حركة مالية</h2>
                <p className="mt-1 text-sm text-white/52">سجّل دخل أو مصروف وسيتم تحديث الصافي فورًا.</p>
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
                <span className="text-xs font-bold text-white/52">وصف الحركة</span>
                <input
                  value={form.label}
                  onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                  placeholder="مثال: اشتراك كابتن خاص"
                  autoFocus
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold text-white/52">المبلغ</span>
                  <input
                    value={form.value}
                    onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                    inputMode="numeric"
                    placeholder="1500"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-white/52">النوع</span>
                  <select
                    value={form.type}
                    onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-midnight-800 px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60"
                  >
                    <option>دخل</option>
                    <option>مصروف</option>
                  </select>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-panda-gold px-5 py-3 text-sm font-extrabold text-midnight-950"
            >
              <Check className="size-5" aria-hidden="true" />
              حفظ الحركة
            </button>
          </motion.form>
        </div>
      ) : null}
    </section>
  );
}
