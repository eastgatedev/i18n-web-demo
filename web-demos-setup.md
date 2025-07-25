# Web Framework Demo Projects Setup for Web Plugin Testing

This document provides instructions for creating demo projects with different i18n configurations to comprehensively test the i18n Translate Pro: Web plugin across multiple web frameworks.

## Quick Setup - All Projects

```bash
# Create root demo project directory
mkdir web-i18n-demo
cd web-i18n-demo

# Create this README.md file in the demo project folder
cat > README.md << 'EOF'
# Web Framework i18n Demo Projects

This folder contains comprehensive demo projects for testing the i18n Translate Pro: Web plugin:

## Projects Structure

- **intl-demo/** - Next.js + next-intl + TypeScript + App Router
- **i18next-demo/** - Next.js + next-i18next + TypeScript + Pages Router
- **vue-demo/** - Vue.js + vue-i18n + TypeScript
- **angular-demo/** - Angular + ngx-translate + TypeScript (JSON format)
- **angular-xlf-demo/** - Angular + Angular i18n + TypeScript (XLF/XLIFF format)

## Quick Start

1. Run the setup commands below to create all projects
2. Use the automated file creation script to generate sample translation files
3. Test the web plugin by right-clicking on translation files in your IDE

See the configuration details and testing instructions below.
EOF

# Project 1: Next.js + next-intl + TypeScript + App Router
mkdir intl-demo
cd intl-demo
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install next-intl
mkdir -p src/messages
cd ..

# Project 2: Next.js + next-i18next + TypeScript + Pages Router
mkdir i18next-demo
cd i18next-demo
npx create-next-app@latest . --typescript --tailwind --eslint --no-app --src-dir --import-alias "@/*"
npm install next-i18next react-i18next i18next
mkdir -p public/locales/en public/locales/es public/locales/fr public/locales/my public/locales/zh public/locales/zh-TW
cd ..

# Project 3: Vue.js + vue-i18n + TypeScript
mkdir vue-demo
cd vue-demo
npm create vue@latest . -- --typescript --jsx --router --pinia --vitest --eslint --prettier
npm install vue-i18n@9
mkdir -p src/locales
cd ..

# Project 4: Angular + ngx-translate + TypeScript (JSON format)
mkdir angular-demo
cd angular-demo
npx -p @angular/cli@latest ng new . --routing --style=css --package-manager=npm --skip-git
npm install @ngx-translate/core @ngx-translate/http-loader ngx-translate-messageformat-compiler
mkdir -p public/i18n
cd ..

# Project 5: Angular + Angular i18n + TypeScript (XLF/XLIFF format)
mkdir angular-xlf-demo
cd angular-xlf-demo
npx -p @angular/cli@latest ng new . --routing --style=css --package-manager=npm --skip-git
ng add @angular/localize
mkdir -p src/locale
cd ..
```

## Project Structure Overview

```
web-i18n-demo/
├── README.md               # This documentation file
├── intl-demo/              # Next.js + next-intl + TypeScript + App Router
│   ├── src/
│   │   ├── app/[locale]/
│   │   ├── messages/       # Translation files here
│   │   └── i18n.ts
│   └── next.config.js
├── i18next-demo/           # Next.js + next-i18next + TypeScript + Pages Router
│   ├── src/pages/
│   ├── public/locales/     # Translation files here
│   └── next-i18next.config.js
├── vue-demo/               # Vue.js + vue-i18n + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── locales/        # Translation files here
│   │   └── i18n/
│   └── vite.config.ts
├── angular-demo/           # Angular + ngx-translate + TypeScript (JSON format)
│   ├── src/
│   │   ├── app/
│   ├── public/i18n/        # Translation files here
│   └── angular.json
└── angular-xlf-demo/       # Angular + Angular i18n + TypeScript (XLF format)
    ├── src/
    │   ├── app/
    │   └── locale/          # XLF translation files here
    └── angular.json
```

## Configuration Scripts

Create these configuration files for each project:

### For intl-demo (next-intl project):

**next.config.js**
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
```

### For i18next-demo (next-i18next project):

**next-i18next.config.js**
```javascript
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'my', 'zh', 'zh-TW'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
```

**next.config.js**
```javascript
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
}

module.exports = nextConfig
```

### For vue-demo (vue-i18n project):

**vite.config.ts** (Update existing):
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

**src/i18n/index.ts**:
```typescript
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
```

**src/main.ts** (Update existing):
```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
```

**src/App.vue** (Update existing):
```vue
<template>
  <div id="app">
    <div class="content">
      <h1>{{ $t('homepage.title') }}</h1>
      <p>{{ $t('homepage.description') }}</p>
      
      <div class="language-switcher">
        <button @click="switchLanguage('en')">English</button>
        <button @click="switchLanguage('es')">Español</button>
        <button @click="switchLanguage('fr')">Français</button>
        <button @click="switchLanguage('my')">Bahasa Melayu</button>
        <button @click="switchLanguage('zh')">中文</button>
        <button @click="switchLanguage('zh-TW')">繁體中文</button>
      </div>
      
      <nav>{{ $t('common.navigation') }}</nav>
      <ul>
        <li><a>{{ $t('common.home') }}</a></li>
        <li><a>{{ $t('common.about') }}</a></li>
        <li><a>{{ $t('common.contact') }}</a></li>
      </ul>
      
      <section>
        <h2>{{ $t('homepage.features.title') }}</h2>
        <ul>
          <li>{{ $t('homepage.features.fast') }}</li>
          <li>{{ $t('homepage.features.modern') }}</li>
          <li>{{ $t('homepage.features.scalable') }}</li>
        </ul>
      </section>
      
      <div>
        <h3>Pluralization Examples:</h3>
        <p>{{ $t('plurals.item', 0) }}</p>
        <p>{{ $t('plurals.item', 1) }}</p>
        <p>{{ $t('plurals.item', 5) }}</p>
        <p>{{ $t('plurals.user', 0) }}</p>
        <p>{{ $t('plurals.user', 1) }}</p>
        <p>{{ $t('plurals.user', 3) }}</p>
        <p>{{ $t('plurals.notification', 0) }}</p>
        <p>{{ $t('plurals.notification', 1) }}</p>
        <p>{{ $t('plurals.notification', 10) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function switchLanguage(lang: string) {
  locale.value = lang
}
</script>

<style scoped>
.language-switcher {
  margin: 20px 0;
}
.language-switcher button {
  margin: 0 5px;
}
</style>
```

### For angular-demo (ngx-translate project):

**src/app/app.module.ts** (Update existing):
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**src/app/app.component.ts** (Update existing):
```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo';

  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('en');
    
    // Use a language
    translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
```

### For angular-xlf-demo (Angular XLF/XLIFF project):

**angular.json** (Update existing i18n configuration):
```json
{
  "projects": {
    "angular-xlf-demo": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "es": {
            "translation": "src/locale/messages.es.xlf",
            "baseHref": "/es/"
          },
          "fr": {
            "translation": "src/locale/messages.fr.xlf",
            "baseHref": "/fr/"
          },
          "my": {
            "translation": "src/locale/messages.my.xlf",
            "baseHref": "/my/"
          },
          "zh": {
            "translation": "src/locale/messages.zh.xlf",
            "baseHref": "/zh/"
          },
          "zh-TW": {
            "translation": "src/locale/messages.zh-TW.xlf",
            "baseHref": "/zh-TW/"
          }
        }
      },
      "architect": {
        "build": {
          "configurations": {
            "es": {
              "aot": true,
              "outputPath": "dist/es/",
              "i18nFile": "src/locale/messages.es.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "es"
            },
            "fr": {
              "aot": true,
              "outputPath": "dist/fr/",
              "i18nFile": "src/locale/messages.fr.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "fr"
            },
            "my": {
              "aot": true,
              "outputPath": "dist/my/",
              "i18nFile": "src/locale/messages.my.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "my"
            },
            "zh": {
              "aot": true,
              "outputPath": "dist/zh/",
              "i18nFile": "src/locale/messages.zh.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "zh"
            },
            "zh-TW": {
              "aot": true,
              "outputPath": "dist/zh-TW/",
              "i18nFile": "src/locale/messages.zh-TW.xlf",
              "i18nFormat": "xlf",
              "i18nLocale": "zh-TW"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "outputPath": "src/locale",
            "outFile": "messages.xlf",
            "format": "xlf"
          }
        }
      }
    }
  }
}
```

**package.json scripts** (Add these to package.json):
```json
{
  "scripts": {
    "extract-i18n": "ng extract-i18n --output-path src/locale",
    "build:es": "ng build --configuration=es",
    "build:fr": "ng build --configuration=fr",
    "build:my": "ng build --configuration=my",
    "build:zh": "ng build --configuration=zh",
    "build:zh-TW": "ng build --configuration=zh-TW",
    "serve:es": "ng serve --configuration=es",
    "serve:fr": "ng serve --configuration=fr",
    "serve:my": "ng serve --configuration=my",
    "serve:zh": "ng serve --configuration=zh",
    "serve:zh-TW": "ng serve --configuration=zh-TW"
  }
}
```

**src/app/app.component.html** (Add ngx-translate usage):
```html
<div class="content">
  <h1>{{ 'homepage.title' | translate }}</h1>
  <p>{{ 'homepage.description' | translate }}</p>
  
  <div class="language-switcher">
    <button (click)="switchLanguage('en')">English</button>
    <button (click)="switchLanguage('es')">Español</button>
    <button (click)="switchLanguage('fr')">Français</button>
    <button (click)="switchLanguage('my')">Bahasa Melayu</button>
    <button (click)="switchLanguage('zh')">中文</button>
    <button (click)="switchLanguage('zh-TW')">繁體中文</button>
  </div>
  
  <nav>{{ 'common.navigation' | translate }}</nav>
  <ul>
    <li><a>{{ 'common.home' | translate }}</a></li>
    <li><a>{{ 'common.about' | translate }}</a></li>
    <li><a>{{ 'common.contact' | translate }}</a></li>
  </ul>
  
  <section>
    <h2>{{ 'homepage.features.title' | translate }}</h2>
    <ul>
      <li>{{ 'homepage.features.fast' | translate }}</li>
      <li>{{ 'homepage.features.modern' | translate }}</li>
      <li>{{ 'homepage.features.scalable' | translate }}</li>
    </ul>
  </section>
  
  <div>
    <h3>Pluralization Examples:</h3>
    <p>{{ 'plurals.item' | translate: {count: 0} }}</p>
    <p>{{ 'plurals.item' | translate: {count: 1} }}</p>
    <p>{{ 'plurals.item' | translate: {count: 5} }}</p>
    <p>{{ 'plurals.user' | translate: {count: 0} }}</p>
    <p>{{ 'plurals.user' | translate: {count: 1} }}</p>
    <p>{{ 'plurals.user' | translate: {count: 3} }}</p>
    <p>{{ 'plurals.notification' | translate: {count: 0} }}</p>
    <p>{{ 'plurals.notification' | translate: {count: 1} }}</p>
    <p>{{ 'plurals.notification' | translate: {count: 10} }}</p>
  </div>
</div>
```

## Sample Translation Files

### For next-intl projects (src/messages/):

**src/messages/en.json**
```json
{
  "common": {
    "welcome": "Welcome to our website",
    "navigation": "Navigation",
    "home": "Home",
    "about": "About", 
    "contact": "Contact"
  },
  "homepage": {
    "title": "International Demo",
    "description": "This is a demo project for testing i18n translation plugin",
    "features": {
      "fast": "Fast Development",
      "modern": "Modern Framework",
      "scalable": "Scalable Architecture"
    }
  },
  "plurals": {
    "items": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
    "users": "There {count, plural, =0 {are no users} =1 {is one user} other {are # users}} online",
    "notifications": "{count, plural, =0 {No notifications} =1 {One notification} other {# notifications}} waiting"
  }
}
```

**src/messages/es.json**, **src/messages/fr.json**, **src/messages/my.json**, **src/messages/zh.json**, and **src/messages/zh-TW.json** - Empty `{}` for testing

### For next-i18next projects (public/locales/):

**public/locales/en/common.json**
```json
{
  "welcome": "Welcome to our website",
  "navigation": "Navigation", 
  "home": "Home",
  "about": "About",
  "contact": "Contact"
}
```

**public/locales/en/homepage.json**
```json
{
  "title": "International Demo",
  "description": "This is a demo project for testing i18n translation plugin",
  "features": {
    "fast": "Fast Development",
    "modern": "Modern Framework",
    "scalable": "Scalable Architecture"
  }
}
```

**public/locales/en/plurals.json**
```json
{
  "item": "You have one item",
  "item_plural": "You have {{count}} items",
  "item_zero": "You have no items",
  "user": "There is one user online",
  "user_plural": "There are {{count}} users online", 
  "user_zero": "There are no users online",
  "notification": "One notification waiting",
  "notification_plural": "{{count}} notifications waiting",
  "notification_zero": "No notifications"
}
```

Empty files for es/, fr/, my/, zh/, and zh-TW/ directories - `{}` for testing translation

### For vue-i18n projects (src/locales/):

**src/locales/en.json**
```json
{
  "common": {
    "welcome": "Welcome to our website",
    "navigation": "Navigation",
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "homepage": {
    "title": "International Demo",
    "description": "This is a demo project for testing i18n translation plugin",
    "features": {
      "title": "Features",
      "fast": "Fast Development",
      "modern": "Modern Framework",
      "scalable": "Scalable Architecture"
    }
  },
  "plurals": {
    "item": "no items | one item | {count} items",
    "user": "no users online | one user online | {count} users online",
    "notification": "no notifications | one notification | {count} notifications waiting",
    "product": "no products | {count} product | {count} products",
    "comment": "no comments | {count} comment | {count} comments"
  }
}
```

**src/locales/es.json**, **src/locales/fr.json**, **src/locales/my.json**, **src/locales/zh.json**, and **src/locales/zh-TW.json** - Empty `{}` for testing

### For ngx-translate projects (public/i18n/):

**public/i18n/en.json**
```json
{
  "common": {
    "welcome": "Welcome to our website",
    "navigation": "Navigation",
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "homepage": {
    "title": "International Demo",
    "description": "This is a demo project for testing i18n translation plugin",
    "features": {
      "title": "Features",
      "fast": "Fast Development",
      "modern": "Modern Framework",
      "scalable": "Scalable Architecture"
    }
  },
  "plurals": {
    "item": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
    "user": "There {count, plural, =0 {are no users} =1 {is one user} other {are # users}} online",
    "notification": "{count, plural, =0 {No notifications} =1 {One notification} other {# notifications}} waiting",
    "product": "{count, plural, =0 {no products} =1 {one product} other {# products}}",
    "comment": "{count, plural, =0 {no comments} =1 {one comment} other {# comments}}"
  }
}
```

**public/i18n/es.json**, **public/i18n/fr.json**, **public/i18n/my.json**, **public/i18n/zh.json**, and **public/i18n/zh-TW.json** - Empty `{}` for testing

### For Angular XLF projects (src/locale/):

After running `ng extract-i18n`, you'll get a base **src/locale/messages.xlf**:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en-US" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="homepage.title" datatype="html">
        <source>International Demo</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.description" datatype="html">
        <source>This is a demo project for testing i18n translation plugin</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.navigation" datatype="html">
        <source>Navigation</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.home" datatype="html">
        <source>Home</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.about" datatype="html">
        <source>About</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.contact" datatype="html">
        <source>Contact</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.title" datatype="html">
        <source>Features</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.fast" datatype="html">
        <source>Fast Development</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.modern" datatype="html">
        <source>Modern Framework</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.scalable" datatype="html">
        <source>Scalable Architecture</source>
        <target></target>
      </trans-unit>
      <trans-unit id="plurals.item" datatype="html">
        <source>You have one item</source>
        <target></target>
      </trans-unit>
      <trans-unit id="plurals.user" datatype="html">
        <source>There is one user online</source>
        <target></target>
      </trans-unit>
      <trans-unit id="plurals.notification" datatype="html">
        <source>One notification waiting</source>
        <target></target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

Copy this to create **src/locale/messages.es.xlf**, **src/locale/messages.fr.xlf**, **src/locale/messages.my.xlf**, **src/locale/messages.zh.xlf**, and **src/locale/messages.zh-TW.xlf** with empty `<target></target>` tags for testing.

## Pluralization Testing

The demo projects include comprehensive pluralization examples to test how the web plugin handles complex translation scenarios:

### next-intl (ICU MessageFormat):
- Uses ICU MessageFormat syntax: `{count, plural, =0 {no items} =1 {one item} other {# items}}`
- Tests complex plural rules with exact matches (=0, =1) and fallbacks (other)
- Handles different language plural rules automatically

### next-i18next (i18next format):
- Uses separate keys: `item`, `item_plural`, `item_zero`
- Tests key-based pluralization system
- Supports zero, singular, and plural forms

### vue-i18n (Vue.js format):
- Uses Vue i18n pipe syntax: `no items | one item | {count} items` (zero | singular | plural)
- Tests Vue-specific pluralization with pipe separator and `$t` function
- Supports automatic plural form selection based on count parameter
- Demonstrates `useI18n()` Composition API for locale switching

### ngx-translate (JSON format):
- Uses ICU MessageFormat: `{count, plural, =0 {no items} =1 {one item} other {# items}}`
- Tests ngx-translate with messageformat compiler for proper pluralization
- Supports exact matches (=0, =1) and fallback rules (other)
- Integrates HTTP loader and TranslateMessageFormatCompiler

### Angular i18n (XLF/XLIFF format):
- Uses `<trans-unit>` elements with unique IDs
- Tests industry-standard XLIFF 1.2 format translation workflow
- Supports translation metadata and context information
- Uses `<source>` and `<target>` elements for original and translated text

**Plugin Testing Focus:**
- How does the plugin handle ICU MessageFormat translation?
- Can it properly translate i18next plural key variations?
- Does it maintain Vue i18n pipe syntax correctly?
- How does it handle Angular's pluralization patterns?
- Does it maintain plural logic across different languages and frameworks?
- How are complex nested plural expressions handled across frameworks?

## Automated File Creation Script

```bash
#!/bin/bash

# Run this script from within web-i18n-demo/ directory
# Creates all sample files for testing

# Create next-intl sample files (intl-demo)
cd intl-demo
cat > src/messages/en.json << 'EOF'
{
  "common": {
    "welcome": "Welcome to our website",
    "navigation": "Navigation",
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "homepage": {
    "title": "International Demo",
    "description": "This is a demo project for testing i18n translation plugin",
    "features": {
      "fast": "Fast Development",
      "modern": "Modern Framework",
      "scalable": "Scalable Architecture"
    }
  },
  "plurals": {
    "items": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
    "users": "There {count, plural, =0 {are no users} =1 {is one user} other {are # users}} online",
    "notifications": "{count, plural, =0 {No notifications} =1 {One notification} other {# notifications}} waiting"
  }
}
EOF
echo '{}' > src/messages/es.json
echo '{}' > src/messages/fr.json
echo '{}' > src/messages/my.json
echo '{}' > src/messages/zh.json
echo '{}' > src/messages/zh-TW.json
cd ..

# Create next-i18next sample files (i18next-demo)
cd i18next-demo
cat > public/locales/en/common.json << 'EOF'
{
  "welcome": "Welcome to our website",
  "navigation": "Navigation",
  "home": "Home", 
  "about": "About",
  "contact": "Contact"
}
EOF
cat > public/locales/en/homepage.json << 'EOF'
{
  "title": "International Demo",
  "description": "This is a demo project for testing i18n translation plugin",
  "features": {
    "fast": "Fast Development",
    "modern": "Modern Framework",
    "scalable": "Scalable Architecture"
  }
}
EOF
cat > public/locales/en/plurals.json << 'EOF'
{
  "item": "You have one item",
  "item_plural": "You have {{count}} items",
  "item_zero": "You have no items",
  "user": "There is one user online",
  "user_plural": "There are {{count}} users online", 
  "user_zero": "There are no users online",
  "notification": "One notification waiting",
  "notification_plural": "{{count}} notifications waiting",
  "notification_zero": "No notifications"
}
EOF
echo '{}' > public/locales/es/common.json
echo '{}' > public/locales/es/homepage.json
echo '{}' > public/locales/es/plurals.json
echo '{}' > public/locales/fr/common.json  
echo '{}' > public/locales/fr/homepage.json
echo '{}' > public/locales/fr/plurals.json
echo '{}' > public/locales/my/common.json
echo '{}' > public/locales/my/homepage.json
echo '{}' > public/locales/my/plurals.json
echo '{}' > public/locales/zh/common.json
echo '{}' > public/locales/zh/homepage.json
echo '{}' > public/locales/zh/plurals.json
echo '{}' > public/locales/zh-TW/common.json
echo '{}' > public/locales/zh-TW/homepage.json
echo '{}' > public/locales/zh-TW/plurals.json
cd ..

# Create Vue.js sample files (vue-demo)
cd vue-demo
cat > src/locales/en.json << 'EOF'
{
  "common": {
    "welcome": "Welcome to our website",
    "navigation": "Navigation",
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "homepage": {
    "title": "International Demo",
    "description": "This is a demo project for testing i18n translation plugin",
    "features": {
      "title": "Features",
      "fast": "Fast Development",
      "modern": "Modern Framework",
      "scalable": "Scalable Architecture"
    }
  },
  "plurals": {
    "item": "no items | one item | {count} items",
    "user": "no users online | one user online | {count} users online",
    "notification": "no notifications | one notification | {count} notifications waiting",
    "product": "no products | {count} product | {count} products",
    "comment": "no comments | {count} comment | {count} comments"
  }
}
EOF
echo '{}' > src/locales/es.json
echo '{}' > src/locales/fr.json
echo '{}' > src/locales/my.json
echo '{}' > src/locales/zh.json
echo '{}' > src/locales/zh-TW.json
cd ..

# Create Angular sample files (angular-demo)
cd angular-demo
cat > public/i18n/en.json << 'EOF'
{
  "common": {
    "welcome": "Welcome to our website",
    "navigation": "Navigation",
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "homepage": {
    "title": "International Demo",
    "description": "This is a demo project for testing i18n translation plugin",
    "features": {
      "title": "Features",
      "fast": "Fast Development",
      "modern": "Modern Framework",
      "scalable": "Scalable Architecture"
    }
  },
  "plurals": {
    "item": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
    "user": "There {count, plural, =0 {are no users} =1 {is one user} other {are # users}} online",
    "notification": "{count, plural, =0 {No notifications} =1 {One notification} other {# notifications}} waiting",
    "product": "{count, plural, =0 {no products} =1 {one product} other {# products}}",
    "comment": "{count, plural, =0 {no comments} =1 {one comment} other {# comments}}"
  }
}
EOF
echo '{}' > public/i18n/es.json
echo '{}' > public/i18n/fr.json
echo '{}' > public/i18n/my.json
echo '{}' > public/i18n/zh.json
echo '{}' > public/i18n/zh-TW.json
cd ..

# Create Angular XLF sample files (angular-xlf-demo)
cd angular-xlf-demo
# Create empty XLF files for testing (after running ng extract-i18n)
cat > src/locale/messages.es.xlf << 'EOF'
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en-US" target-language="es" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="homepage.title" datatype="html">
        <source>International Demo</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.description" datatype="html">
        <source>This is a demo project for testing i18n translation plugin</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.navigation" datatype="html">
        <source>Navigation</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.home" datatype="html">
        <source>Home</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.about" datatype="html">
        <source>About</source>
        <target></target>
      </trans-unit>
      <trans-unit id="common.contact" datatype="html">
        <source>Contact</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.title" datatype="html">
        <source>Features</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.fast" datatype="html">
        <source>Fast Development</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.modern" datatype="html">
        <source>Modern Framework</source>
        <target></target>
      </trans-unit>
      <trans-unit id="homepage.features.scalable" datatype="html">
        <source>Scalable Architecture</source>
        <target></target>
      </trans-unit>
      <trans-unit id="plurals.item" datatype="html">
        <source>You have one item</source>
        <target></target>
      </trans-unit>
      <trans-unit id="plurals.user" datatype="html">
        <source>There is one user online</source>
        <target></target>
      </trans-unit>
      <trans-unit id="plurals.notification" datatype="html">
        <source>One notification waiting</source>
        <target></target>
      </trans-unit>
    </body>
  </file>
</xliff>
EOF
cp src/locale/messages.es.xlf src/locale/messages.fr.xlf
sed -i 's/target-language="es"/target-language="fr"/g' src/locale/messages.fr.xlf
cp src/locale/messages.es.xlf src/locale/messages.my.xlf
sed -i 's/target-language="es"/target-language="my"/g' src/locale/messages.my.xlf
cp src/locale/messages.es.xlf src/locale/messages.zh.xlf
sed -i 's/target-language="es"/target-language="zh"/g' src/locale/messages.zh.xlf
cp src/locale/messages.es.xlf src/locale/messages.zh-TW.xlf
sed -i 's/target-language="es"/target-language="zh-TW"/g' src/locale/messages.zh-TW.xlf
cd ..

echo "All sample files created successfully!"
```

## Testing Matrix

| Project | Framework | Language | Library | File Structure | Test Focus |
|---------|-----------|----------|---------|----------------|------------|
| `intl-demo` | Next.js App Router | TypeScript | next-intl | `src/messages/` | Modern TS setup |
| `i18next-demo` | Next.js Pages Router | TypeScript | next-i18next | `public/locales/` | Legacy TS setup |
| `vue-demo` | Vue.js + Vite | TypeScript | vue-i18n | `src/locales/` | Vue i18n setup |
| `angular-demo` | Angular CLI | TypeScript | ngx-translate | `public/i18n/` | ngx-translate setup |
| `angular-xlf-demo` | Angular CLI | TypeScript | Angular i18n | `src/locale/` | Angular XLF setup |

## Quick Testing Commands

```bash
# Test each project
cd intl-demo && npm run dev &          # Port 3000
cd i18next-demo && npm run dev &       # Port 3001  
cd vue-demo && npm run dev &           # Port 5173 (Vite default)
cd angular-demo && npm run start &     # Port 4200 (Angular default)
cd angular-xlf-demo && npm run start &  # Port 4201 (Angular XLF)

# Plugin testing workflow:
# 1. Open each project in IDE
# 2. Right-click on translation files (*.json, *.xlf)
# 3. Use "Translate Properties" action from web plugin
# 4. Verify translations in browser
# 5. Test different framework patterns and file formats
# 6. For Angular XLF: Run `ng extract-i18n` first to create base XLF files
```

This setup provides comprehensive coverage for testing the web plugin across all major web frameworks:
- **Next.js** (both next-intl and next-i18next)
- **Vue.js** (vue-i18n with Vite)
- **Angular** (ngx-translate for JSON and Angular i18n for XLF formats)

Each framework tests different file structure patterns and pluralization approaches supported by the i18n Translate Pro: Web plugin:
- **JSON formats**: Next.js, Vue.js, ngx-translate
- **XLF/XLIFF formats**: Angular XLF for enterprise i18n workflows
- **Multiple pluralization systems**: ICU MessageFormat, i18next, Vue i18n pipes, ngx-translate interpolation, Angular XLF patterns
