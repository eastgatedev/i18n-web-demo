# Vue.js + vue-i18n Demo

A comprehensive internationalization demo showcasing **vue-i18n** with Vue 3 Composition API, featuring 6 languages and dynamic language switching capabilities with a modern, professional UI matching the design of other i18n demos.

## 🌟 Features

- **6 Language Support**: English, Spanish, French, Malay, Chinese (Simplified), Chinese (Traditional)
- **Dynamic Language Switching**: Runtime language switching with vue-i18n
- **Interactive Pluralization Demo**: Real-time counters demonstrating vue-i18n pipe syntax
- **Vue 3 Composition API**: Modern Vue 3 patterns with `<script setup>`
- **Browser Language Detection**: Auto-detect user's preferred language
- **Professional UI Design**: Dark gradient theme matching other i18n demos
- **TailwindCSS Styling**: Modern utility-first CSS framework

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the demo.

## 🏗️ Project Structure

```
vue-demo/
├── src/
│   ├── App.vue                  # Main app component with modern UI
│   ├── components/
│   │   └── LanguageSwitcher.vue # Professional language switcher
│   ├── i18n/
│   │   └── index.ts             # Vue-i18n configuration
│   ├── locales/                 # Translation files
│   │   ├── en.json              # English translations
│   │   ├── es.json              # Spanish translations
│   │   ├── fr.json              # French translations
│   │   ├── my.json              # Malay translations
│   │   ├── zh.json              # Chinese (Simplified)
│   │   └── zh-TW.json           # Chinese (Traditional)
│   └── main.ts                  # App entry point with i18n setup
├── tailwind.config.js           # TailwindCSS configuration
├── postcss.config.js            # PostCSS configuration
└── vite.config.ts               # Vite configuration with vue-i18n plugin
```

## 🌐 Language Support

| Language | Code | Status | Translation File |
|----------|------|--------|------------------|
| English (Default) | `en` | ✅ Complete | en.json |
| Spanish | `es` | ✅ Complete | es.json |
| French | `fr` | ✅ Complete | fr.json |
| Malay | `my` | ✅ Complete | my.json |
| Chinese (Simplified) | `zh` | ✅ Complete | zh.json |
| Chinese (Traditional) | `zh-TW` | ✅ Complete | zh-TW.json |

## 🔧 Key Technical Implementation

### Vue-i18n Configuration

```typescript
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
// ... other imports

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es, fr, my, zh, 'zh-TW': zhTW },
})

export default i18n
```

### Vue 3 Composition API Usage

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const itemCount = ref(0)

const switchLanguage = (lang: string) => {
  locale.value = lang
}
</script>
```

### Vue-i18n Pluralization (Pipe Syntax)

```json
{
  "plurals": {
    "item": "no items | one item | {count} items",
    "user": "no users online | one user online | {count} users online"
  }
}
```

## 🎮 Interactive Demo Features

1. **Language Switcher**: Individual buttons for each language with flag icons
2. **Auto-Detect Button**: Detects browser language and switches accordingly
3. **Interactive Pluralization Counters**:
   - Items counter (blue background)
   - Users counter (green background)
   - Notifications counter (yellow background)
4. **Real-time Updates**: Counter values update pluralization instantly
5. **Current Language Display**: Shows active language and URL structure

## 📊 Performance & Architecture

- **Vue 3**: Modern Composition API with `<script setup>`
- **Vite**: Fast build tool with HMR support
- **Runtime I18n**: Dynamic language switching without page reload
- **Bundle Size**: ~165kB (includes all i18n functionality)
- **Vue-i18n Pipe Syntax**: Efficient pluralization format

## 🎨 Design Features

- **Dark Gradient Background**: Professional blue-to-indigo gradient
- **Glass Morphism**: Backdrop blur effects on cards
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Design**: Mobile and desktop optimized
- **TailwindCSS**: Utility-first CSS framework
- **Dark Mode Support**: Automatic theme adaptation

## 🔍 Development Commands

```bash
# Development
npm run dev                # Start development server (port 5173)

# Production
npm run build              # Build for production
npm run preview            # Preview production build

# Testing & Quality
npm run test:unit          # Run unit tests with Vitest
npm run lint               # ESLint with auto-fix
npm run format             # Prettier formatting
```

## 🆚 vs Other i18n Approaches

**vue-i18n Advantages:**
- ✅ Runtime language switching
- ✅ Vue 3 Composition API support
- ✅ Simple pipe syntax for pluralization
- ✅ Reactive state integration
- ✅ Developer-friendly API

**Perfect for:**
- Single Page Applications (SPAs)
- Admin dashboards and management tools
- Applications requiring instant language switching
- Vue.js ecosystem projects
- Rapid prototyping and development

## 📚 Vue-i18n Specific Features

### Pipe Syntax Pluralization
```vue
<template>
  <!-- Vue-i18n uses pipe syntax -->
  <p>{{ $t('plurals.item', count) }}</p>
  <!-- Translates: "no items | one item | {count} items" -->
</template>
```

### Composition API Integration
```typescript
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const message = t('welcome') // Get translation
locale.value = 'es' // Change language
```

## 🔧 Technical Setup

### TailwindCSS Configuration
The demo uses TailwindCSS v4 with PostCSS plugin:

```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Vite Integration
Vue-i18n is integrated with Vite for optimal development experience:

```typescript
// vite.config.ts
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve('./src/locales/**'),
    }),
  ],
})
```

## 📖 Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue-i18n Documentation](https://vue-i18n.intlify.dev/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vite Documentation](https://vite.dev/)

## 🔗 Related Projects

This demo is part of a comprehensive i18n testing suite:
- **../i18next-demo/**: Next.js + next-i18next (Pages Router + runtime)
- **../intl-demo/**: Next.js + next-intl (App Router + static)
- **../angular-xlf-demo/**: Angular + official i18n (static approach)
- **../angular-demo/**: Angular + ngx-translate (runtime approach)

## 🎯 Visual Design Match

This demo features **identical visual design** to the Next.js and Angular demos, enabling direct comparison between Vue.js + vue-i18n and other i18n approaches while showcasing the same professional UI and user experience.

## 🌟 Vue 3 + TypeScript + Vite

Built with modern Vue 3 ecosystem:
- **Vue 3**: Composition API with `<script setup>` syntax
- **TypeScript**: Full type safety and IDE support
- **Vite**: Fast development and optimized production builds
- **Vue-i18n**: Official internationalization library for Vue.js
