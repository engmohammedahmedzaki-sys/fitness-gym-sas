import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TableProperties } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { basicModuleOrder, basicModules } from '../data/basicDataModules.js';

const statusByModule = {
  core: 'أساسي',
  settings: 'قواعد',
  notifications: 'رسائل',
  activities: 'أنشطة',
  plans: 'اشتراكات',
  services: 'بيع',
  news: 'محتوى',
  members: 'باركود',
  employees: 'باركود',
  lockers: 'تشغيلي',
  warehouses: 'مخزون',
  schedule: 'جدولة',
};

export default function BasicData() {
  return (
    <section aria-labelledby="basic-data-title">
      <PageHeader
        eyebrow="البيانات الأساسية"
        title="مركز تأسيس النظام"
        description="هنا هنحط كل التعريفات اللي باقي الموديولات هتبني عليها: اشتراكات، أنشطة، خدمات، موظفين، مخازن، وجداول."
        icon={TableProperties}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {basicModuleOrder.map((moduleKey, index) => {
          const { title, description, icon: Icon } = basicModules[moduleKey];
          return (
          <motion.div
            key={moduleKey}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Link
              to={`/basic-data/${moduleKey}`}
              className="glass-panel flex min-h-44 flex-col items-start justify-between rounded-2xl p-5 text-start transition hover:bg-white/[0.14]"
            >
              <span className="flex w-full items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-electric-blue/14 text-electric-cyan">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-panda-gold/25 bg-panda-gold/10 px-3 py-1 text-xs font-extrabold text-panda-gold">
                  {statusByModule[moduleKey]}
                </span>
              </span>
              <span>
                <span className="block text-xl font-extrabold text-white">{title}</span>
                <span className="mt-2 block text-sm leading-7 text-white/56">{description}</span>
              </span>
            </Link>
          </motion.div>
          );
        })}
      </div>

      <div className="glass-panel-strong mt-5 rounded-2xl p-5">
        <h2 className="font-display text-xl font-extrabold">قاعدة الداتا المقترحة لهذا المديول</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['branches', 'subscription_plans', 'activities', 'services', 'employees', 'warehouses', 'lockers', 'weekly_schedules'].map((table) => (
            <code key={table} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-electric-cyan">
              {table}
            </code>
          ))}
        </div>
      </div>
    </section>
  );
}
