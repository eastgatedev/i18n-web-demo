# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains 7 comprehensive demo projects designed for testing the i18n Translate Pro: Web plugin across different internationalization configurations:

- **intl-demo/**: Next.js + next-intl + TypeScript + App Router
- **intl-demo-js/**: Next.js + next-intl + JavaScript + App Router
- **i18next-demo/**: Next.js + next-i18next + TypeScript + Pages Router
- **i18next-demo-js/**: Next.js + next-i18next + JavaScript + Pages Router
- **vue-demo/**: Vue.js + vue-i18n + TypeScript + Vite
- **angular-demo/**: Angular + ngx-translate + TypeScript
- **angular-xlf-demo/**: Angular + XLIFF + TypeScript

## Common Development Commands

### Framework-specific commands:

#### Next.js projects (intl-demo, intl-demo-js, i18next-demo, i18next-demo-js):
```bash
npm run dev          # Development server (port 3000)
npm run build        # Build project
npm run start        # Start production server
npm run lint         # Lint code
```

#### Vue.js project (vue-demo):
```bash
npm run dev          # Development server (port 5173)
npm run build        # Build project
npm run preview      # Preview production build
npm run test:unit    # Run unit tests
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

#### Angular projects (angular-demo, angular-xlf-demo):
```bash
ng serve            # Development server (port 4200)
ng build            # Build project
ng test             # Run unit tests
ng extract-i18n     # Extract i18n strings (XLF projects only)
```

### Project-specific ports:
- intl-demo: Port 3000 (Next.js default)
- i18next-demo: Port 3000 (Next.js default, or next available port if 3000 is taken)
- vue-demo: Port 5173 (Vite default)
- angular-demo: Port 4200 (Angular CLI default)
- angular-xlf-demo: Port 4200 (Angular CLI default, or next available port if 4200 is taken)

## Architecture Overview

### Project Structure Pattern
```
i18n-web-demo/
├── README.md                    # Main documentation
├── web-demos-setup.md          # Detailed setup instructions
├── intl-demo/                  # next-intl TypeScript demo
│   ├── src/messages/           # Translation files (next-intl)
│   └── next.config.js
├── intl-demo-js/               # next-intl JavaScript demo
│   ├── src/messages/           # Translation files (next-intl)
│   └── next.config.js
├── i18next-demo/               # next-i18next TypeScript demo
│   ├── public/locales/         # Translation files (next-i18next)
│   └── next-i18next.config.js
├── i18next-demo-js/            # next-i18next JavaScript demo
│   ├── public/locales/         # Translation files (next-i18next)
│   └── next-i18next.config.js
├── vue-demo/                   # Vue.js + vue-i18n demo
│   ├── src/locales/            # Translation files (vue-i18n)
│   └── vite.config.ts
├── angular-demo/               # Angular + ngx-translate demo
│   ├── public/i18n/            # Translation files (ngx-translate)
│   └── angular.json
└── angular-xlf-demo/           # Angular + XLIFF demo
    ├── src/locale/             # XLF translation files
    └── angular.json
```

### Translation File Locations
- **next-intl projects**: Translation files in `src/messages/` (en.json, es.json, fr.json, MY.json, zh.json, zh-TW.json)
- **next-i18next projects**: Translation files in `public/locales/{locale}/` (common.json, homepage.json, plurals.json)
- **vue-i18n projects**: Translation files in `src/locales/` (en.json, es.json, fr.json, my.json, zh.json, zh-TW.json)
- **ngx-translate projects**: Translation files in `public/i18n/` (en.json, es.json, fr.json, my.json, zh.json, zh-TW.json)
- **Angular XLIFF projects**: Translation files in `src/locale/` (messages.xlf, messages.es.xlf, messages.fr.xlf, etc.)

### Key Configuration Files
- **next-intl projects**: Use `next.config.js` with `next-intl/plugin`
- **next-i18next projects**: Use `next-i18next.config.js` with locale configuration
- **vue-i18n projects**: Use `vite.config.ts` with `@intlify/unplugin-vue-i18n/vite`
- **ngx-translate projects**: Use `angular.json` and import TranslateModule in app.module.ts
- **Angular XLIFF projects**: Use `angular.json` with i18n configuration and locale-specific builds

### Pluralization Systems
- **next-intl**: Uses ICU MessageFormat syntax: `{count, plural, =0 {no items} =1 {one item} other {# items}}`
- **next-i18next**: Uses separate keys: `item`, `item_plural`, `item_zero`
- **vue-i18n**: Uses pipe syntax: `no items | one item | {count} items`
- **ngx-translate**: Uses ICU MessageFormat with messageformat compiler: `{count, plural, =0 {no items} =1 {one item} other {# items}}`
- **Angular XLIFF**: Uses `<trans-unit>` elements with `<source>` and `<target>` tags

## Setup Requirements

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or equivalent package manager

### Project Dependencies
Each project has its own package.json with specific dependencies:
- **Next.js projects**: next, react, typescript, tailwindcss
- **Vue project**: vue, vue-i18n, @intlify/unplugin-vue-i18n, vite
- **Angular projects**: @angular/core, @angular/cli
  - angular-demo: @ngx-translate/core, ngx-translate-messageformat-compiler
  - angular-xlf-demo: @angular/localize

### Installation
Run `npm install` in each project directory before starting development.

## Development Workflow

When working with translation files:
1. Understand which project type you're working with (Next.js, Vue.js, or Angular)
2. Locate translation files in the correct directory structure for that framework
3. Follow the appropriate pluralization format for the library
4. Test changes by running the development server for that specific project
5. Use the appropriate commands for each framework (npm/ng/vite)

Each project is independent with its own package.json, dependencies, and configuration.