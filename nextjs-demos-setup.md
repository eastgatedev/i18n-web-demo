# Complete Next.js Demo Projects Setup for Web Plugin Testing

This document provides instructions for creating all 4 Next.js demo projects with different i18n configurations to comprehensively test the i18n Translate Pro: Web plugin.

## Quick Setup - All Projects

```bash
# Create root demo project directory
mkdir nextjs-i18n-demo
cd nextjs-i18n-demo

# Create this README.md file in the demo project folder
cat > README.md << 'EOF'
# Next.js i18n Demo Projects

This folder contains 4 comprehensive demo projects for testing the i18n Translate Pro: Web plugin:

## Projects Structure

- **intl-demo/** - next-intl + TypeScript + App Router
- **intl-js-demo/** - next-intl + JavaScript + App Router  
- **i18next-demo/** - next-i18next + TypeScript + Pages Router
- **i18next-js-demo/** - next-i18next + JavaScript + Pages Router

## Quick Start

1. Run the setup commands below to create all projects
2. Use the automated file creation script to generate sample translation files
3. Test the web plugin by right-clicking on translation files in your IDE

See the configuration details and testing instructions below.
EOF

# Project 1: next-intl + TypeScript + App Router
mkdir intl-demo
cd intl-demo
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install next-intl
mkdir -p src/messages public/locales
cd ..

# Project 2: next-intl + JavaScript + App Router  
mkdir intl-js-demo
cd intl-js-demo
npx create-next-app@latest . --no-typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install next-intl
mkdir -p src/messages public/locales
cd ..

# Project 3: next-i18next + TypeScript + Pages Router
mkdir i18next-demo
cd i18next-demo
npx create-next-app@latest . --typescript --tailwind --eslint --no-app --src-dir --import-alias "@/*"
npm install next-i18next react-i18next i18next
mkdir -p public/locales/en public/locales/es public/locales/fr
cd ..

# Project 4: next-i18next + JavaScript + Pages Router
mkdir i18next-js-demo
cd i18next-js-demo
npx create-next-app@latest . --no-typescript --tailwind --eslint --no-app --src-dir --import-alias "@/*"
npm install next-i18next react-i18next i18next
mkdir -p public/locales/en public/locales/es public/locales/fr
cd ..
```

## Project Structure Overview

```
nextjs-i18n-demo/
├── README.md               # This documentation file
├── intl-demo/              # next-intl + TypeScript + App Router
│   ├── src/
│   │   ├── app/[locale]/
│   │   ├── messages/       # Translation files here
│   │   └── i18n.ts
│   └── next.config.js
├── intl-js-demo/           # next-intl + JavaScript + App Router
│   ├── src/
│   │   ├── app/[locale]/
│   │   ├── messages/       # Translation files here
│   │   └── i18n.js
│   └── next.config.js
├── i18next-demo/           # next-i18next + TypeScript + Pages Router
│   ├── src/pages/
│   ├── public/locales/     # Translation files here
│   └── next-i18next.config.js
└── i18next-js-demo/        # next-i18next + JavaScript + Pages Router
    ├── src/pages/
    ├── public/locales/     # Translation files here
    └── next-i18next.config.js
```

## Configuration Scripts

Create these configuration files for each project:

### For intl-demo and intl-js-demo (next-intl projects):

**next.config.js**
```javascript
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
```

### For i18next-demo and i18next-js-demo (next-i18next projects):

**next-i18next.config.js**
```javascript
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
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

**src/messages/es.json** and **src/messages/fr.json** - Empty `{}` for testing

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

Empty files for es/ and fr/ directories - `{}` for testing translation

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

**Plugin Testing Focus:**
- How does the plugin handle ICU MessageFormat translation?
- Can it properly translate i18next plural key variations?
- Does it maintain plural logic across different languages?
- How are complex nested plural expressions handled?

## Automated File Creation Script

```bash
#!/bin/bash

# Run this script from within nextjs-i18n-demo/ directory
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
cd ..

# Create next-intl sample files (intl-js-demo)
cd intl-js-demo
cp -r ../intl-demo/src/messages/* src/messages/
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
cd ..

# Create next-i18next sample files (i18next-js-demo)
cd i18next-js-demo
cp -r ../i18next-demo/public/locales/* public/locales/
cd ..

echo "All sample files created successfully!"
```

## Testing Matrix

| Project | Architecture | Language | Library | File Structure | Test Focus |
|---------|-------------|----------|---------|----------------|------------|
| `intl-demo` | App Router | TypeScript | next-intl | `src/messages/` | Modern TS setup |
| `intl-js-demo` | App Router | JavaScript | next-intl | `src/messages/` | Modern JS setup |
| `i18next-demo` | Pages Router | TypeScript | next-i18next | `public/locales/` | Legacy TS setup |
| `i18next-js-demo` | Pages Router | JavaScript | next-i18next | `public/locales/` | Legacy JS setup |

## Quick Testing Commands

```bash
# Test each project
cd intl-demo && npm run dev &          # Port 3000
cd intl-js-demo && npm run dev &       # Port 3001  
cd i18next-demo && npm run dev &       # Port 3002
cd i18next-js-demo && npm run dev &    # Port 3003

# Plugin testing workflow:
# 1. Open each project in IDE
# 2. Right-click on translation files
# 3. Use "Translate Properties" action
# 4. Verify translations in browser
```

This setup provides comprehensive coverage for testing the web plugin across all major Next.js + i18n configurations!
