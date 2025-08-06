import { createI18n } from 'vue-i18n'

// Import JSON locale files
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import my from '../locales/my.json'
import zh from '../locales/zh.json'
import zhTW from '../locales/zh-TW.json'

const messages = {
  en,
  es,
  fr,
  my,
  zh,
  'zh-TW': zhTW
}

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n