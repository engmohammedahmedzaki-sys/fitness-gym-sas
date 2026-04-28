import React, { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit3, Link2, Plus, Printer, ScanLine, Search, X } from 'lucide-react';
import BarcodeCard from '../components/BarcodeCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { basicModules } from '../data/basicDataModules.js';

function emptyRecord(fields) {
  return fields.reduce((record, field) => {
    record[field.key] = field.options?.[0] || '';
    return record;
  }, {});
}

function FieldInput({ field, value, onChange }) {
  const baseClass = 'mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white outline-none focus:border-electric-cyan/60';

  if (field.type === 'select') {
    return (
      <select value={value} onChange={(event) => onChange(event.target.value)} className={`${baseClass} bg-midnight-800`}>
        {field.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${baseClass} min-h-24 resize-none`} />;
  }

  return <input value={value} onChange={(event) => onChange(event.target.value)} className={baseClass} type={field.type || 'text'} />;
}

export default function BasicDataManager() {
  const { section } = useParams();
  const module = basicModules[section];
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState(module?.rows || []);
  const [editingRecord, setEditingRecord] = useState(null);
  const [printingRecord, setPrintingRecord] = useState(null);
  const [linkingRecord, setLinkingRecord] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState('');

  const formFields = module?.fields || [];

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;

    return rows.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [query, rows]);

  if (!module) {
    return <Navigate to="/basic-data" replace />;
  }

  const openNew = () => {
    setEditingRecord({ id: `${section.toUpperCase()}-${Date.now()}`, ...emptyRecord(formFields) });
  };

  const saveRecord = (event) => {
    event.preventDefault();
    setRows((currentRows) => {
      const exists = currentRows.some((row) => row.id === editingRecord.id);
      return exists
        ? currentRows.map((row) => (row.id === editingRecord.id ? editingRecord : row))
        : [editingRecord, ...currentRows];
    });
    setEditingRecord(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const openLinkCard = (row) => {
    setLinkingRecord(row);
    setScannedBarcode(row.barcodeValue || '');
  };

  const saveLinkedCard = (event) => {
    event.preventDefault();
    const barcodeValue = scannedBarcode.trim();
    if (!barcodeValue) return;

    setRows((currentRows) =>
      currentRows.map((row) => (row.id === linkingRecord.id ? { ...row, barcodeValue } : row)),
    );
    setLinkingRecord(null);
    setScannedBarcode('');
  };

  return (
    <section aria-labelledby="basic-section-title">
      <PageHeader eyebrow={module.eyebrow} title={module.title} description={module.description} icon={module.icon} />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="glass-panel flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3">
          <Search className="size-5 text-electric-cyan" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/42"
            placeholder="بحث في كل الأعمدة"
            aria-label="بحث"
          />
        </label>
        <button
          type="button"
          onClick={openNew}
          className="glass-panel-strong inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-panda-gold"
        >
          <Plus className="size-5" aria-hidden="true" />
          إدخال جديد
        </button>
      </div>

      <div className="glass-panel overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.08] text-white/72">
                <th className="w-28 px-4 py-4 text-start">إجراءات</th>
                {module.barcode ? <th className="w-56 px-4 py-4 text-start">الباركود والكارت</th> : null}
                {module.columns.map((column) => (
                  <th key={column.key} className="px-4 py-4 text-start font-extrabold">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-white/8 text-white/76 odd:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEditingRecord(row)}
                      className="grid size-9 place-items-center rounded-xl bg-white/10 text-electric-cyan"
                      aria-label="تعديل"
                    >
                      <Edit3 className="size-4" aria-hidden="true" />
                    </button>
                  </td>
                  {module.barcode ? (
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setPrintingRecord(row)}
                          className="inline-flex items-center gap-2 rounded-xl bg-panda-gold/12 px-3 py-2 text-xs font-extrabold text-panda-gold"
                        >
                          <Printer className="size-4" aria-hidden="true" />
                          طباعة
                        </button>
                        <button
                          type="button"
                          onClick={() => openLinkCard(row)}
                          className="inline-flex items-center gap-2 rounded-xl bg-electric-blue/12 px-3 py-2 text-xs font-extrabold text-electric-cyan"
                        >
                          <ScanLine className="size-4" aria-hidden="true" />
                          ربط كارت
                        </button>
                      </div>
                    </td>
                  ) : null}
                  {module.columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 font-bold">
                      {row[column.key] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!filteredRows.length ? (
          <div className="p-10 text-center">
            <p className="text-lg font-extrabold text-white">لا توجد بيانات</p>
            <p className="mt-2 text-sm text-white/52">أضف أول سجل أو غيّر البحث الحالي.</p>
          </div>
        ) : null}

        <div className="border-t border-white/10 px-4 py-3 text-xs font-bold text-white/48">
          الإجمالي {filteredRows.length}
        </div>
      </div>

      {editingRecord ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/62 p-4 backdrop-blur-sm sm:place-items-center">
          <motion.form
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onSubmit={saveRecord}
            className="glass-panel-strong max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white">بيانات السجل</h2>
                <p className="mt-1 text-sm text-white/52">{module.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70"
                aria-label="إغلاق"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {formFields.map((field) => (
                <label key={field.key} className={field.type === 'textarea' ? 'block sm:col-span-2' : 'block'}>
                  <span className="text-xs font-bold text-white/52">{field.label}</span>
                  <FieldInput
                    field={field}
                    value={editingRecord[field.key] || ''}
                    onChange={(value) => setEditingRecord((current) => ({ ...current, [field.key]: value }))}
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-2xl bg-panda-gold px-5 py-3 text-sm font-extrabold text-midnight-950"
            >
              حفظ البيانات
            </button>
          </motion.form>
        </div>
      ) : null}

      {printingRecord ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/72 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <div className="mb-4 flex justify-between gap-3 print:hidden">
              <button
                type="button"
                onClick={() => setPrintingRecord(null)}
                className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white"
              >
                إغلاق
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-2xl bg-panda-gold px-4 py-2 text-sm font-extrabold text-midnight-950"
              >
                طباعة / حفظ PDF
              </button>
            </div>
            <div className="print-card">
              <BarcodeCard record={printingRecord} type={section} />
            </div>
          </div>
        </div>
      ) : null}

      {linkingRecord ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/62 p-4 backdrop-blur-sm sm:place-items-center">
          <motion.form
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onSubmit={saveLinkedCard}
            className="glass-panel-strong w-full max-w-lg rounded-2xl p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white">ربط كارت جاهز</h2>
                <p className="mt-1 text-sm leading-6 text-white/52">
                  اسكن الباركود الموجود على الكارت الجاهز أو اكتب قيمته، وسيتم ربطه بـ {linkingRecord.nameAr}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLinkingRecord(null)}
                className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70"
                aria-label="إغلاق"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <label className="mt-5 block">
              <span className="text-xs font-bold text-white/52">قيمة باركود الكارت</span>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 focus-within:border-electric-cyan/60">
                <ScanLine className="size-5 shrink-0 text-electric-cyan" aria-hidden="true" />
                <input
                  value={scannedBarcode}
                  onChange={(event) => setScannedBarcode(event.target.value)}
                  className="w-full bg-transparent text-sm font-extrabold text-white outline-none placeholder:text-white/40"
                  placeholder="ضع المؤشر هنا ثم اسكن الكارت"
                  autoFocus
                />
              </div>
            </label>

            <div className="mt-4 rounded-2xl border border-panda-gold/25 bg-panda-gold/10 p-4 text-sm leading-7 text-panda-gold">
              بعد الربط، السكان بهذا الكارت يجيب ملف العضو/الموظف مباشرة للحضور والانصراف أو الدخول والخروج.
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-panda-gold px-5 py-3 text-sm font-extrabold text-midnight-950"
            >
              <Link2 className="size-5" aria-hidden="true" />
              ربط الكارت
            </button>
          </motion.form>
        </div>
      ) : null}
    </section>
  );
}
