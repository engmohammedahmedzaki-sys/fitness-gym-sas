export const countries = [
  { id: 'eg', name: 'مصر', currency: 'جنيه مصري', symbol: 'ج.م', taxName: 'ضريبة القيمة المضافة', defaultTax: 14, locale: 'ar-EG' },
  { id: 'sa', name: 'السعودية', currency: 'ريال سعودي', symbol: 'ر.س', taxName: 'VAT', defaultTax: 15, locale: 'ar-SA' },
  { id: 'ae', name: 'الإمارات', currency: 'درهم إماراتي', symbol: 'د.إ', taxName: 'VAT', defaultTax: 5, locale: 'ar-AE' },
  { id: 'kw', name: 'الكويت', currency: 'دينار كويتي', symbol: 'د.ك', taxName: 'ضريبة محلية', defaultTax: 0, locale: 'ar-KW' },
];

export const sportVerticals = [
  'جيم',
  'باليه',
  'سباحة',
  'كاراتيه',
  'كونغ فو',
  'فتنس',
  'بوكس',
  'أكاديمية رياضية',
  'تنس',
  'كرة قدم',
  'رياضات قتالية',
  'تدريب شخصي',
];

export const exportFormats = ['Excel', 'PDF', 'JSON', 'CSV'];

export const reportsCatalog = [
  {
    id: 'sales-summary',
    title: 'ملخص المبيعات',
    description: 'اشتراكات، منتجات، خدمات، فواتير، وطرق الدفع خلال أي فترة.',
    metric: '184,500',
    tone: 'cyan',
  },
  {
    id: 'profit-loss',
    title: 'الأرباح والخسائر',
    description: 'إيرادات ناقص مصاريف ورواتب وخصومات مع صافي الربح.',
    metric: '42%',
    tone: 'gold',
  },
  {
    id: 'inventory-movement',
    title: 'حركة المخزون',
    description: 'دخول وخروج الأصناف، حد إعادة الطلب، وقيمة المخزون.',
    metric: '318',
    tone: 'green',
  },
  {
    id: 'customer-analysis',
    title: 'تحليل العملاء',
    description: 'النشطين، المنتهين، معدل التجديد، والأنشطة الأعلى مبيعاً.',
    metric: '76%',
    tone: 'blue',
  },
  {
    id: 'taxes',
    title: 'تقرير الضرائب',
    description: 'ضريبة حسب الدولة، الفواتير الخاضعة، والإجمالي المستحق.',
    metric: '14%',
    tone: 'rose',
  },
  {
    id: 'monthly-expenses',
    title: 'المصاريف الشهرية',
    description: 'تصنيف المصروفات، الرواتب، الإيجارات، والموردين.',
    metric: '38,200',
    tone: 'gold',
  },
];

export const printProfiles = [
  { id: 'thermal-58', name: 'فاتورة حرارية 58mm', width: '58mm', use: 'إيصالات كاشير' },
  { id: 'thermal-80', name: 'فاتورة حرارية 80mm', width: '80mm', use: 'فواتير تفصيلية' },
  { id: 'barcode-small', name: 'ملصق باركود صغير', width: '40x25mm', use: 'كارنيهات وأصناف' },
  { id: 'barcode-card', name: 'كارت عضوية', width: '85x54mm', use: 'طباعة كارنيه' },
];

export const roles = [
  { id: 'owner', name: 'مالك النادي', permissions: ['كل الصلاحيات', 'إدارة الباقات', 'إعداد الدفع', 'التقارير'] },
  { id: 'admin', name: 'مدير النظام', permissions: ['الأعضاء', 'الاشتراكات', 'الموظفين', 'التقارير'] },
  { id: 'accountant', name: 'محاسب', permissions: ['الفواتير', 'المصاريف', 'الضرائب', 'التصدير'] },
  { id: 'reception', name: 'استقبال', permissions: ['الحضور', 'تجديد الاشتراك', 'طباعة الباركود'] },
  { id: 'coach', name: 'مدرب', permissions: ['حضور الحصص', 'متابعة الأعضاء', 'الجدول'] },
];

export const marketingIntegrations = [
  { id: 'gsc', name: 'Google Search Console', field: 'HTML verification meta tag', status: 'SEO' },
  { id: 'google-ads', name: 'Google Ads', field: 'Conversion ID / Label', status: 'Ads' },
  { id: 'ga4', name: 'Google Analytics 4', field: 'Measurement ID', status: 'Analytics' },
  { id: 'bing', name: 'Bing Webmaster Tools', field: 'Verification code', status: 'SEO' },
  { id: 'meta', name: 'Meta Pixel', field: 'Pixel ID', status: 'Social' },
  { id: 'pinterest', name: 'Pinterest Tag', field: 'Tag ID', status: 'Social' },
  { id: 'merchant', name: 'Google Merchant Center', field: 'Merchant verification / feed URL', status: 'Commerce' },
];
