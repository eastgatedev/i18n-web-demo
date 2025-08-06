# Next.js + next-intl Demo

A comprehensive internationalization demo showcasing **next-intl** with Next.js App Router, featuring 6 languages and dynamic language switching capabilities with a modern, professional UI.

## 🌟 Features

- **6 Language Support**: English, Spanish, French, Malay, Chinese (Simplified), Chinese (Traditional)
- **Dynamic Language Switching**: Client-side language switching with URL-based routing
- **Interactive Pluralization Demo**: Real-time counters demonstrating ICU MessageFormat pluralization rules
- **Server Components**: Optimal performance with Next.js App Router
- **Browser Language Detection**: Auto-detect user's preferred language
- **Modern UI Design**: Professional dark gradient theme matching i18next-demo

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo.

## 🏗️ Project Structure

```
intl-demo/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx       # Root layout with NextIntlClientProvider
│   │       └── page.tsx         # Main demo page with interactive features
│   ├── components/
│   │   └── LanguageSwitcher.tsx # Button-based language switcher
│   ├── i18n/
│   │   └── request.ts           # Server-side i18n configuration
│   ├── messages/                # Translation files
│   │   ├── en.json              # English translations
│   │   ├── es.json              # Spanish translations
│   │   ├── fr.json              # French translations
│   │   ├── MY.json              # Malay translations
│   │   ├── zh.json              # Chinese (Simplified)
│   │   └── zh-TW.json           # Chinese (Traditional)
│   └── middleware.ts            # Locale detection and routing
├── i18n.ts                      # next-intl configuration
└── next.config.js               # Next.js configuration
```

## 🌐 Language Support

| Language | Code | Status | Translation File |
|----------|------|--------|------------------|
| English (Default) | `en` | ✅ Complete | en.json |
| Spanish | `es` | ✅ Complete | es.json |
| French | `fr` | ✅ Complete | fr.json |
| Malay | `MY` | ✅ Complete | MY.json |
| Chinese (Simplified) | `zh` | ✅ Complete | zh.json |
| Chinese (Traditional) | `zh-TW` | ✅ Complete | zh-TW.json |

## 🔧 Key Technical Implementation

### next-intl Configuration

```typescript
// i18n.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'MY', 'zh', 'zh-TW'],
  defaultLocale: 'en'
});
```

### Server Components Integration

```tsx
// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function RootLayout({ 
  children, 
  params 
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

### ICU MessageFormat Pluralization

```json
{
  "plurals": {
    "items": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
    "users": "There {count, plural, =0 {are no users} =1 {is one user} other {are # users}} online"
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
4. **URL Routing**: Each language has its own URL path (`/en`, `/es`, `/fr`, etc.)
5. **Real-time Updates**: Counter values update pluralization instantly

## 📊 Performance & Architecture

- **App Router**: Modern Next.js architecture with Server Components
- **Static Generation**: Pre-rendered pages for optimal performance
- **Client-side Routing**: Fast navigation between languages
- **Bundle Size**: ~122kB First Load JS (includes all i18n functionality)
- **ICU MessageFormat**: Industry-standard pluralization format

## 🎨 Design Features

- **Dark Gradient Background**: Professional blue-to-indigo gradient
- **Glass Morphism**: Backdrop blur effects on cards
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark Mode Support**: Automatic dark/light theme adaptation

## 🔍 Testing the Implementation

```bash
# Development
npm run dev                    # Start development server

# Production
npm run build                  # Build for production
npm start                      # Start production server

# Code Quality
npm run lint                   # ESLint check
```

## 🌐 URL Structure

- English (default): `http://localhost:3000/en`
- Spanish: `http://localhost:3000/es`
- French: `http://localhost:3000/fr`
- Malay: `http://localhost:3000/MY`
- Chinese: `http://localhost:3000/zh`
- Traditional Chinese: `http://localhost:3000/zh-TW`

## 🆚 vs Other i18n Approaches

**next-intl Advantages:**
- ✅ Server Components support
- ✅ App Router optimization
- ✅ ICU MessageFormat standard
- ✅ TypeScript-first design
- ✅ Static generation friendly

**Perfect for:**
- Modern Next.js applications
- SEO-focused websites
- Performance-critical applications
- Applications requiring Server Components
- Teams wanting type-safe translations

## 📚 Additional Resources

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-intl Documentation](https://github.com/amannn/next-intl)
- [ICU MessageFormat Guide](https://formatjs.io/docs/core-concepts/icu-syntax/)

## 🔗 Related Projects

This demo is part of a comprehensive i18n testing suite:
- **../i18next-demo/**: Next.js + next-i18next (Pages Router + runtime)
- **../angular-xlf-demo/**: Angular + official i18n (static approach)
- **../angular-demo/**: Angular + ngx-translate (runtime approach)
- **../vue-demo/**: Vue.js + vue-i18n implementation

## 🎯 Visual Design Match

This demo features **identical visual design** to the i18next-demo, enabling direct comparison between next-intl (App Router) and next-i18next (Pages Router) approaches while showcasing the same professional UI and user experience.
