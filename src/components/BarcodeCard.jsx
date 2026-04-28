import React from 'react';
import BrandMark from './BrandMark.jsx';
import Code39Barcode from './Code39Barcode.jsx';

export default function BarcodeCard({ record, type }) {
  const label = type === 'employees' ? 'كارت موظف' : 'كارت عضو';

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-5 text-midnight-950 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <BrandMark className="size-14" />
        <div className="text-end">
          <p className="text-xs font-bold text-slate-500">{label}</p>
          <h3 className="text-lg font-extrabold">Fitness Gym</h3>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xl font-extrabold">{record.nameAr}</p>
        <p className="mt-1 text-sm font-bold text-slate-500">{record.job || record.branch || 'الفرع الرئيسي'}</p>
      </div>
      <div className="mt-5">
        <Code39Barcode value={record.barcodeValue || record.id || record.code} />
      </div>
      <p className="mt-4 text-center text-xs font-bold text-slate-500">
        يستخدم للسكان في الحضور والانصراف والدخول والخروج
      </p>
    </div>
  );
}
