import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CreditCard, Crown, DatabaseZap, KeyRound, Palette, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { paymentGateways, saasPlans, tenantIsolationTables, tenants as initialTenants } from '../data/tenants.js';

const formatCurrency = new Intl.NumberFormat('ar-EG');

export default function MasterConsole() {
  const [tenants] = useState(initialTenants);
  const [selectedTenant, setSelectedTenant] = useState(initialTenants[0]);

  const totals = useMemo(() => {
    const activeTenants = tenants.filter((tenant) => tenant.status === 'نشط').length;
    const monthlyRevenue = tenants.reduce((sum, tenant) => {
      const plan = saasPlans.find((item) => item.name === tenant.plan);
      return sum + (plan?.price || 0);
    }, 0);

    return {
      activeTenants,
      monthlyRevenue,
      members: tenants.reduce((sum, tenant) => sum + tenant.members, 0),
      users: tenants.reduce((sum, tenant) => sum + tenant.users, 0),
    };
  }, [tenants]);

  return (
    <section aria-labelledby="master-console-title">
      <PageHeader
        eyebrow="Panda Plus Master"
        title="لوحة تحكم الماستر"
        description="إدارة النوادي المشتركة، الاشتراكات، الصلاحيات، والهوية الخاصة بكل نادي من مكان واحد."
        icon={Crown}
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['نوادي نشطة', totals.activeTenants, Building2],
          ['إيراد شهري', `${formatCurrency.format(totals.monthlyRevenue)} ج.م`, Crown],
          ['إجمالي الأعضاء', totals.members, DatabaseZap],
          ['مستخدمين النظام', totals.users, KeyRound],
        ].map(([label, value, Icon]) => (
          <div key={label} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-white/54">{label}</p>
              <Icon className="size-5 text-panda-gold" aria-hidden="true" />
            </div>
            <p className="mt-4 text-3xl font-extrabold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="glass-panel overflow-hidden rounded-2xl">
          <div className="border-b border-white/10 p-5">
            <h2 className="font-display text-xl font-extrabold">النوادي المشتركة</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.08] text-white/62">
                  {['النادي', 'المالك', 'الخطة', 'الحالة', 'ينتهي في', 'فروع', 'مستخدمين', 'أعضاء'].map((header) => (
                    <th key={header} className="px-4 py-4 text-start font-extrabold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    onClick={() => setSelectedTenant(tenant)}
                    className="cursor-pointer border-b border-white/8 text-white/76 transition hover:bg-white/[0.08]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="size-3 rounded-full" style={{ background: tenant.brandColor }} />
                        <span className="font-extrabold">{tenant.gymName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold">{tenant.ownerName}</td>
                    <td className="px-4 py-4 font-bold">{tenant.plan}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-extrabold text-emerald-200">
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold">{tenant.subscriptionEnds}</td>
                    <td className="px-4 py-4 font-bold">{tenant.branches}</td>
                    <td className="px-4 py-4 font-bold">{tenant.users}</td>
                    <td className="px-4 py-4 font-bold">{tenant.members}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="glass-panel-strong rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-electric-blue/14 text-electric-cyan">
              <Palette className="size-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-white/45">النادي المحدد</p>
              <h2 className="text-xl font-extrabold text-white">{selectedTenant.gymName}</h2>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['Tenant ID', selectedTenant.id],
              ['Domain', selectedTenant.domain],
              ['Brand Color', selectedTenant.brandColor],
              ['Plan', selectedTenant.plan],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold text-white/42">{label}</p>
                <p className="mt-1 break-words text-sm font-extrabold text-white">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="glass-panel-strong mt-5 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-6 text-panda-gold" aria-hidden="true" />
          <h2 className="font-display text-xl font-extrabold">قاعدة العزل الأساسية</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-white/58">
          كل جدول تشغيلي لازم يحتوي `tenant_id` عشان كل نادي يشوف بياناته فقط، والماستر فقط يقدر يشوف ويدير الكل.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tenantIsolationTables.map((table) => (
            <code key={table} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-electric-cyan">
              {table}
            </code>
          ))}
        </div>
      </div>

      <div className="glass-panel mt-5 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <CreditCard className="size-6 text-electric-cyan" aria-hidden="true" />
          <h2 className="font-display text-xl font-extrabold">تحكم بوابات الدفع حسب الباقة</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-white/58">
          الماستر يحدد لكل باقة هل تظهر Paymob أو Fawaterk أو الدفع اليدوي داخل إعدادات النادي.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {saasPlans.map((plan) => (
            <div key={plan.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="font-display text-lg font-black text-white">{plan.name}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {paymentGateways.map((gateway) => {
                  const enabled = plan.gateways.includes(gateway.id);
                  return (
                    <span
                      key={gateway.id}
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                        enabled ? 'bg-emerald-300/10 text-emerald-200' : 'bg-white/[0.06] text-white/30'
                      }`}
                    >
                      {gateway.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
