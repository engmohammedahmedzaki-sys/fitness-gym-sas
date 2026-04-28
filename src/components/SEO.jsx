import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO() {
  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>Fitness Gym | نظام إدارة صالات رياضية بالذكاء الاصطناعي</title>
      <meta
        name="description"
        content="Fitness Gym نظام عربي فاخر لإدارة الجيم: أعضاء، اشتراكات، حضور، إيرادات، وتقارير ذكية مدعومة بالذكاء الاصطناعي."
      />
      <meta name="keywords" content="Fitness Gym, إدارة جيم, إدارة صالة رياضية, اشتراكات, حضور, ذكاء اصطناعي, Panda Plus" />
      <meta property="og:title" content="Fitness Gym | نظام إدارة الصالات الرياضية" />
      <meta property="og:description" content="لوحة تحكم عربية RTL لإدارة أعضاء الجيم والمالية والحضور عبر أوامر ذكية." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
