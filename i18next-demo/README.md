# Next.js + next-i18next Demo

A comprehensive internationalization demo showcasing **next-i18next** with Next.js Pages Router, featuring 6 languages and dynamic language switching capabilities.

## 🌟 Features

- **6 Language Support**: English, Spanish, French, Malay, Chinese (Simplified), Chinese (Traditional)
- **Dynamic Language Switching**: Runtime language switching with URL-based routing
- **Pluralization Demo**: Interactive counters demonstrating next-i18next pluralization rules
- **Static Generation**: `getStaticProps` implementation for optimal performance
- **Browser Language Detection**: Auto-detect user's preferred language
- **Professional UI**: Modern design with Tailwind CSS

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo.

## 🏗️ Project Structure

```
i18next-demo/
├── public/
│   └── locales/              # Translation files
│       ├── en/
│       │   ├── common.json   # Navigation, general UI
│       │   ├── homepage.json # Page content
│       │   └── plurals.json  # Pluralization examples
│       ├── es/, fr/, MY/, zh/, zh-TW/
│       └── ...
├── src/
│   ├── components/
│   │   └── LanguageSwitcher.tsx  # Language switching component
│   └── pages/
│       ├── _app.tsx          # App wrapper with appWithTranslation
│       └── index.tsx         # Main demo page
├── next-i18next.config.js    # i18n configuration
└── next.config.js            # Next.js config with i18n routing
```

## 🌐 Language Support

| Language | Code | Status | Translation Files |
|----------|------|--------|------------------|
| English (Default) | `en` | ✅ Complete | common.json, homepage.json, plurals.json |
| Spanish | `es` | ✅ Complete | common.json, homepage.json, plurals.json |
| French | `fr` | ✅ Complete | common.json, homepage.json, plurals.json |
| Malay | `MY` | ✅ Complete | common.json, homepage.json, plurals.json |
| Chinese (Simplified) | `zh` | ✅ Complete | common.json, homepage.json, plurals.json |
| Chinese (Traditional) | `zh-TW` | ✅ Complete | common.json, homepage.json, plurals.json |

## 🔧 Key Technical Implementation

### next-i18next Configuration

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'MY', 'zh', 'zh-TW'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
```

### App Wrapper

```tsx
// pages/_app.tsx  
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
```

### Static Generation with i18n

```tsx
// pages/index.tsx
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'homepage', 
        'plurals',
      ])),
    },
  };
};
```

### Pluralization Examples

next-i18next uses separate keys for pluralization:

```json
{
  "item": "You have one item",
  "item_plural": "You have {{count}} items", 
  "item_zero": "You have no items"
}
```

## 🎮 Interactive Demo Features

1. **Language Switcher**: Click any language button to instantly switch
2. **Auto-Detect Button**: Detects browser language and switches accordingly
3. **Pluralization Counters**: 
   - Items counter (demonstrates zero/one/many)
   - Users counter (online users scenario)
   - Notifications counter (typical app notifications)
4. **URL Routing**: Each language has its own URL path (`/en`, `/es`, `/fr`, etc.)

## 📊 Performance & Architecture

- **Runtime Library**: Dynamic translation loading and switching
- **Flexible Development**: Easy to add/modify translations
- **Pages Router**: Traditional Next.js routing with i18n
- **Static Generation**: Pre-rendered pages for all locales
- **Bundle Size**: ~117kB (includes all i18n functionality)

## 🔍 Testing the Implementation

```bash
# Development
npm run dev                    # Start development server

# Production
npm run build                  # Build all locale variants
npm start                      # Start production server

# Code Quality
npm run lint                   # ESLint check
```

## 🌐 URL Structure

- English (default): `http://localhost:3000/`
- Spanish: `http://localhost:3000/es`
- French: `http://localhost:3000/fr`
- Malay: `http://localhost:3000/MY`
- Chinese: `http://localhost:3000/zh`
- Traditional Chinese: `http://localhost:3000/zh-TW`

## 🆚 vs Other i18n Approaches

**next-i18next Advantages:**
- ✅ Dynamic language switching
- ✅ Runtime flexibility
- ✅ Easy content management
- ✅ Developer-friendly workflow

**Trade-offs:**
- 📦 Larger bundle size (runtime library)
- ⏱️ Translation loading time
- 🔄 Client-side language switching

**Best for:**
- Admin dashboards
- SaaS applications  
- Applications with frequent content changes
- Projects prioritizing developer experience

## 📚 Additional Resources

- [Next.js i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [next-i18next Documentation](https://github.com/i18next/next-i18next)
- [i18next Pluralization Rules](https://www.i18next.com/translation-function/plurals)

## 🔗 Related Projects

This demo is part of a comprehensive i18n testing suite:
- **../angular-xlf-demo/**: Angular + official i18n (static approach)
- **../angular-demo/**: Angular + ngx-translate (runtime approach)
- **../vue-demo/**: Vue.js + vue-i18n implementation
- **../intl-demo/**: Next.js + next-intl (App Router + static)
