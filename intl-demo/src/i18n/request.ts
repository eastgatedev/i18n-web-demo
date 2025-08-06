import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
export default getRequestConfig(async ({locale}) => {
  // Debug log
  console.log('Request config locale:', locale);
  
  // Fallback to 'en' if locale is undefined
  const currentLocale = locale || 'en';
  console.log('Using locale:', currentLocale);
  
  const supportedLocales = ['en', 'es', 'fr', 'MY', 'zh', 'zh-TW'];
  if (!supportedLocales.includes(currentLocale)) {
    console.error('Unsupported locale:', currentLocale);
    notFound();
  }
  
  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});