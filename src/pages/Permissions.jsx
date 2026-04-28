import React from 'react';
import { ShieldCheck, UserCog } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { roles } from '../data/platformModules.js';

export default function Permissions() {
  return (
    <section aria-labelledby="permissions-title">
      <PageHeader
        eyebrow="الصلاحيات والمستخدمين"
        title="أدوار الموظفين والتحكم في الوصول"
        description="المالك يعمل يوزرات للموظفين، يحدد الصلاحيات، وكل شاشة تظهر حسب الدور والباقة."
        icon={ShieldCheck}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {roles.map((role) => (
          <article key={role.id} className="glass-panel rounded-2xl p-5">
            <UserCog className="size-7 text-electric-cyan" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-extrabold text-white">{role.name}</h2>
            <div className="mt-4 grid gap-2">
              {role.permissions.map((permission) => (
                <span key={permission} className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-extrabold text-white/66">
                  {permission}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
