import React from 'react';
import { BarChart3, Download, FileJson, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { exportFormats, reportsCatalog } from '../data/platformModules.js';

const iconMap = {
  Excel: FileSpreadsheet,
  PDF: FileText,
  JSON: FileJson,
  CSV: Download,
};

export default function ReportsCenter() {
  return (
    <section aria-labelledby="reports-title">
      <PageHeader
        eyebrow="التقارير والتحليلات"
        title="مركز التقارير الذكية"
        description="مبيعات، أرباح وخسائر، مخزون، عملاء، ضرائب، ومصاريف شهرية مع تصدير Excel وPDF وJSON."
        icon={BarChart3}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reportsCatalog.map((report) => (
          <article key={report.id} className="glass-panel rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-extrabold text-white">{report.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-7 text-white/56">{report.description}</p>
              </div>
              <span className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-lg font-black text-electric-cyan">
                {report.metric}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {exportFormats.map((format) => {
                const Icon = iconMap[format];
                return (
                  <button key={format} type="button" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-extrabold text-white/70">
                    <Icon className="size-4" aria-hidden="true" />
                    {format}
                  </button>
                );
              })}
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-panda-gold px-3 py-2 text-xs font-black text-midnight-950">
                <Printer className="size-4" aria-hidden="true" />
                طباعة
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="glass-panel-strong mt-5 rounded-2xl p-5">
        <h2 className="font-display text-xl font-extrabold">المساعد الذكي للتقارير</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/58">
          هنا المساعد هيبقى فاهم صلاحيات المستخدم، الدولة، العملة، والبيانات المتاحة له. مثال: "طلعلي أرباح شهر أبريل" أو "قارن مصاريف الفرعين".
        </p>
      </div>
    </section>
  );
}
