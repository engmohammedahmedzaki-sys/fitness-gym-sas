import { useMemo } from 'react';
import { financeRows, members } from '../data/gymData.js';

const normalizeArabic = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[؟?]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه');

const formatCurrency = new Intl.NumberFormat('ar-EG');

export default function useAiCommand(command) {
  return useMemo(() => {
    const normalized = normalizeArabic(command);

    if (!normalized) return null;

    const riskyMembers = members.filter((member) => member.status !== 'نشط');
    const expenses = financeRows.filter((row) => row.type === 'مصروف');
    const income = financeRows.filter((row) => row.type === 'دخل');
    const totalExpenses = expenses.reduce((sum, row) => sum + row.value, 0);
    const totalIncome = income.reduce((sum, row) => sum + row.value, 0);

    if (normalized.includes('اشتراك') && (normalized.includes('خلص') || normalized.includes('انته') || normalized.includes('قريب'))) {
      return {
        title: 'الاشتراكات التي تحتاج متابعة',
        summary: `وجدت ${riskyMembers.length} أعضاء يحتاجون متابعة اشتراك.`,
        items: riskyMembers.map((member) => `${member.name} - ${member.status} - ${member.expiresAt}`),
        tone: 'warning',
      };
    }

    if (normalized.includes('مصروف') || normalized.includes('المصاريف')) {
      return {
        title: 'تقرير المصروفات',
        summary: `إجمالي المصروفات الحالية ${formatCurrency.format(totalExpenses)} ج.م.`,
        items: expenses.map((row) => `${row.label} - ${formatCurrency.format(row.value)} ج.م`),
        tone: 'danger',
      };
    }

    if (normalized.includes('ايراد') || normalized.includes('الدخل') || normalized.includes('فلوس')) {
      return {
        title: 'تقرير الإيرادات',
        summary: `إجمالي الدخل الحالي ${formatCurrency.format(totalIncome)} ج.م.`,
        items: income.map((row) => `${row.label} - ${formatCurrency.format(row.value)} ج.م`),
        tone: 'success',
      };
    }

    if (normalized.includes('حضور')) {
      const topAttendance = [...members].sort((a, b) => b.attendance - a.attendance).slice(0, 3);
      return {
        title: 'ملخص الحضور',
        summary: 'أعلى الأعضاء حضورًا هذا الشهر حسب البيانات الحالية.',
        items: topAttendance.map((member) => `${member.name} - ${member.attendance} زيارة`),
        tone: 'info',
      };
    }

    return {
      title: 'اقتراحات أوامر ذكية',
      summary: 'جرّب سؤالًا مثل: مين اشتراكه خلص؟ أو تقرير المصاريف أو تقرير الإيرادات.',
      items: ['مين اشتراكه خلص؟', 'تقرير المصاريف', 'تقرير الإيرادات', 'ملخص الحضور'],
      tone: 'info',
    };
  }, [command]);
}
