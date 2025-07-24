# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains 2 comprehensive Next.js demo projects designed for testing the i18n Translate Pro: Web plugin across different internationalization configurations:

- **intl-demo/**: next-intl + TypeScript + App Router
- **i18next-demo/**: next-i18next + TypeScript + Pages Router

## Common Development Commands

### For each individual project:
```bash
# Development server (in any project directory)
npm run dev

# Build project
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Project-specific ports:
- intl-demo: Port 3000
- i18next-demo: Port 3002

## Architecture Overview

### Project Structure Pattern
```
nextjs-i18n-demo/
├── README.md                    # Main documentation
├── nextjs-demos-setup.md       # Detailed setup instructions
├── intl-demo/                  # next-intl TypeScript demo
│   ├── src/messages/           # Translation files (next-intl)
│   └── next.config.js
└── i18next-demo/               # next-i18next TypeScript demo
    ├── public/locales/         # Translation files (next-i18next)
    └── next-i18next.config.js
```

### Translation File Locations
- **next-intl projects**: Translation files in `src/messages/` (en.json, es.json, fr.json)
- **next-i18next projects**: Translation files in `public/locales/{locale}/` (common.json, homepage.json, plurals.json)

### Key Configuration Files
- **next-intl projects**: Use `next.config.js` with `next-intl/plugin`
- **next-i18next projects**: Use `next-i18next.config.js` with locale configuration

### Pluralization Systems
- **next-intl**: Uses ICU MessageFormat syntax: `{count, plural, =0 {no items} =1 {one item} other {# items}}`
- **next-i18next**: Uses separate keys: `item`, `item_plural`, `item_zero`

## Development Workflow

When working with translation files:
1. Understand which project type you're working with (next-intl vs next-i18next)
2. Locate translation files in the correct directory structure
3. Follow the appropriate pluralization format for the library
4. Test changes by running the development server for that specific project

Each project is independent with its own package.json, dependencies, and configuration.