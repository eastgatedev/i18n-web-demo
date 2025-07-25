import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import my from '@/locales/my.json'
import zh from '@/locales/zh.json'
import zhTW from '@/locales/zh-TW.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    fr,
    my,
    zh,
    'zh-TW': zhTW,
  },
})

export default i18n