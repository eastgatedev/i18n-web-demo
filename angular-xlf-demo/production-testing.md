# Angular XLF Demo - Production Testing Guide

## 🏗️ Modern Production Build Process

### Single Command Build (Recommended)

The modern Angular i18n approach uses **one command** to build all languages:

```bash
# Build all locales at once (Angular 9+)
npm run build              # Uses ng build --localize
```

This replaces the old approach of building each language separately, reducing build time from **2+ minutes to ~40 seconds**.

### Legacy Individual Builds (Not Recommended)
```bash
# Old way - much slower, avoid unless needed for specific deployment
npm run build:production  # English only
```

## 📁 Modern Build Structure

After running `npm run build`, you'll have:

```
dist/angular-xlf-demo/browser/
├── en-US/                      # English (source locale)
│   ├── index.html             # <html lang="en-US"> <base href="/">  
│   └── main-xxx.js
├── es/                        # Spanish
│   ├── index.html             # <html lang="es"> <base href="/es/">
│   └── main-xxx.js  
├── fr/                        # French
│   ├── index.html             # <html lang="fr"> <base href="/fr/">
│   └── main-xxx.js
├── my/                        # Malay
├── zh/                        # Chinese (Simplified)
└── zh-TW/                     # Chinese (Traditional)
```

## 🌐 Testing Production Builds

### Method 1: Using `serve` (Recommended)

Install serve globally:
```bash
npm install -g serve
```

Test each language on different ports:
```bash
# English (source locale) - Port 3000
serve -s dist/angular-xlf-demo/browser/en-US -p 3000

# Spanish - Port 3001  
serve -s dist/angular-xlf-demo/browser/es -p 3001

# French - Port 3002
serve -s dist/angular-xlf-demo/browser/fr -p 3002

# Malay - Port 3003
serve -s dist/angular-xlf-demo/browser/my -p 3003

# Chinese - Port 3004
serve -s dist/angular-xlf-demo/browser/zh -p 3004

# Chinese Traditional - Port 3005
serve -s dist/angular-xlf-demo/browser/zh-TW -p 3005
```

### Method 1b: Serve with URL Structure Simulation

```bash
# Serve entire browser folder to test URL routing
serve -s dist/angular-xlf-demo/browser -p 3000

# Then access:
# http://localhost:3000/en-US/  (English)
# http://localhost:3000/es/     (Spanish) 
# http://localhost:3000/fr/     (French)
# etc.
```

### Method 2: Using Python (if available)

```bash
# Navigate to each build directory and serve
cd dist/angular-xlf-demo/browser/es && python -m http.server 3001
cd dist/angular-xlf-demo/browser/fr && python -m http.server 3002
# ... etc
```

### Method 3: Using Node.js http-server

```bash
npm install -g http-server

# Serve Spanish
http-server dist/angular-xlf-demo/browser/es -p 3001

# Serve French  
http-server dist/angular-xlf-demo/browser/fr -p 3002
```

## 🧪 What to Test

### 1. **Build Verification**
- ✅ Single `ng build --localize` command builds all languages
- ✅ Build completes in ~5 seconds (vs 2+ minutes with old approach)  
- ✅ Each language has its own directory structure
- ✅ Bundle sizes are consistent (~260KB total)

### 2. **Translation Testing**
When you visit each URL, verify:
- ✅ English: `http://localhost:3000` - Shows English text with `<html lang="en-US">`
- ✅ Spanish: `http://localhost:3001` - Shows Spanish text with `<html lang="es">`  
- ✅ French: `http://localhost:3002` - Shows French text with `<html lang="fr">`
- ✅ Each version has correct `<base href="/locale/">` tag

### 3. **Language Switcher Testing**
- ✅ Current language is properly highlighted
- ✅ Clicking languages shows production URL structure info
- ✅ 🌐 Auto-Detect button demonstrates Accept-Language detection
- ✅ Language switcher shows all 6 languages

### 4. **Modern vs Legacy Approach**

| Aspect | Legacy (Pre-Angular 9) | Modern (Angular 9+) |
|--------|------------------------|---------------------|
| **Build Command** | `ng build` × 6 times | `ng build --localize` once |
| **Build Time** | ~2+ minutes | ~40 seconds |  
| **Configuration** | Complex per-locale configs | Simple `"localize": true` |
| **Bundle Generation** | Sequential | Parallel |
| **Maintenance** | High complexity | Low complexity |

## 🚀 Production Deployment Structure

In a real deployment, you would:

```
yourwebsite.com/           # English (default)  
yourwebsite.com/es/        # Spanish
yourwebsite.com/fr/        # French
yourwebsite.com/my/        # Malay
yourwebsite.com/zh/        # Chinese
yourwebsite.com/zh-TW/     # Chinese Traditional
```

### Server Configuration Example (Nginx)

```nginx
server {
    server_name yourwebsite.com;
    
    # Default English
    location / {
        root /var/www/dist/angular-xlf-demo/browser;
        try_files $uri $uri/ /index.html;
    }
    
    # Spanish
    location /es/ {
        root /var/www/dist/es/browser;
        try_files $uri $uri/ /es/index.html;
    }
    
    # French
    location /fr/ {  
        root /var/www/dist/fr/browser;
        try_files $uri $uri/ /fr/index.html;
    }
}
```

## 🎯 Key Differences from Other i18n Approaches

### Angular XLF (This Demo)
- ✅ **Build-time translation** - faster loading
- ✅ **Separate builds per language** - smaller bundles per language
- ✅ **SEO-friendly** - each language has its own URL
- ⚠️ **Requires server configuration** for routing
- ⚠️ **Cannot switch languages instantly** (requires page reload)

### Runtime Libraries (ngx-translate, vue-i18n, etc.)
- ✅ **Instant language switching**
- ✅ **Single build**
- ⚠️ **Larger initial bundle** (includes all translations)
- ⚠️ **Runtime translation loading** (slightly slower)

## 🔧 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
rm -rf dist/
npm run build:es

# Check for XLF file issues
ng extract-i18n --output-path src/locale
```

### Serve Issues
```bash
# Make sure serve is installed globally
npm list -g serve

# Use full paths
serve -s /full/path/to/dist/es/browser/es -p 3001
```

### Translation Issues
- Verify XLF files have proper `<target>` elements filled
- Check that locale codes match between angular.json and XLF files
- Ensure baseHref is properly configured

## 📊 Performance Comparison

| Language | Bundle Size | Gzipped | Load Time |
|----------|-------------|---------|-----------|
| English  | 253.69 kB  | 72.38 kB | ~200ms |
| Spanish  | 255.06 kB  | 73.17 kB | ~205ms |
| French   | 255.59 kB  | 73.35 kB | ~206ms |
| Other    | ~255 kB    | ~73 kB   | ~205ms |

*Actual performance will vary based on network conditions and server configuration.