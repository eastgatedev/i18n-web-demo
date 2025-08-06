# Server Configuration Examples for Angular i18n Deployment

This document provides production-ready server configurations for deploying Angular applications with internationalization using the official Angular i18n approach.

## 🏗️ Build Output Structure

After running `ng build --localize`, your application will have this structure:

```
dist/angular-xlf-demo/
├── browser/
│   ├── en-US/          # English (default/source locale)
│   │   ├── index.html  # <html lang="en-US"> <base href="/">
│   │   ├── main.js
│   │   └── ...
│   ├── es/             # Spanish 
│   │   ├── index.html  # <html lang="es"> <base href="/es/">
│   │   ├── main.js
│   │   └── ...
│   ├── fr/             # French
│   │   ├── index.html  # <html lang="fr"> <base href="/fr/">
│   │   ├── main.js
│   │   └── ...
│   └── ...
```

## 🌐 Nginx Configuration

### Basic Configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/dist/angular-xlf-demo/browser;
    index index.html;

    # Default to English (source locale)
    location / {
        try_files $uri $uri/ /en-US/index.html;
    }

    # Spanish
    location /es/ {
        alias /var/www/dist/angular-xlf-demo/browser/es/;
        try_files $uri $uri/ /es/index.html;
    }

    # French  
    location /fr/ {
        alias /var/www/dist/angular-xlf-demo/browser/fr/;
        try_files $uri $uri/ /fr/index.html;
    }

    # Malay
    location /my/ {
        alias /var/www/dist/angular-xlf-demo/browser/my/;
        try_files $uri $uri/ /my/index.html;
    }

    # Chinese (Simplified)
    location /zh/ {
        alias /var/www/dist/angular-xlf-demo/browser/zh/;
        try_files $uri $uri/ /zh/index.html;
    }

    # Chinese (Traditional)
    location /zh-TW/ {
        alias /var/www/dist/angular-xlf-demo/browser/zh-TW/;
        try_files $uri $uri/ /zh-TW/index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Advanced Configuration with Accept-Language Detection

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/dist/angular-xlf-demo/browser;
    index index.html;

    # Language detection for root requests
    location = / {
        # Check Accept-Language header and redirect accordingly
        if ($http_accept_language ~* ^es) {
            return 302 /es/;
        }
        if ($http_accept_language ~* ^fr) {
            return 302 /fr/;
        }
        if ($http_accept_language ~* ^ms) {
            return 302 /my/;
        }
        if ($http_accept_language ~* ^zh-TW) {
            return 302 /zh-TW/;
        }
        if ($http_accept_language ~* ^zh) {
            return 302 /zh/;
        }
        
        # Default to English
        try_files $uri $uri/ /en-US/index.html;
    }

    # Serve specific locales
    location /es/ {
        alias /var/www/dist/angular-xlf-demo/browser/es/;
        try_files $uri $uri/ /es/index.html;
    }

    location /fr/ {
        alias /var/www/dist/angular-xlf-demo/browser/fr/;
        try_files $uri $uri/ /fr/index.html;
    }

    location /my/ {
        alias /var/www/dist/angular-xlf-demo/browser/my/;
        try_files $uri $uri/ /my/index.html;
    }

    location /zh/ {
        alias /var/www/dist/angular-xlf-demo/browser/zh/;
        try_files $uri $uri/ /zh/index.html;
    }

    location /zh-TW/ {
        alias /var/www/dist/angular-xlf-demo/browser/zh-TW/;
        try_files $uri $uri/ /zh-TW/index.html;
    }

    # Default English routes
    location / {
        try_files $uri $uri/ /en-US/index.html;
    }
}
```

## 🔧 Apache Configuration

### Basic .htaccess Configuration

```apache
RewriteEngine On

# Spanish
RewriteRule ^es/(.*)$ /browser/es/$1 [L]
RewriteRule ^es/?$ /browser/es/index.html [L]

# French
RewriteRule ^fr/(.*)$ /browser/fr/$1 [L]  
RewriteRule ^fr/?$ /browser/fr/index.html [L]

# Malay
RewriteRule ^my/(.*)$ /browser/my/$1 [L]
RewriteRule ^my/?$ /browser/my/index.html [L]

# Chinese (Simplified)
RewriteRule ^zh/(.*)$ /browser/zh/$1 [L]
RewriteRule ^zh/?$ /browser/zh/index.html [L]

# Chinese (Traditional)  
RewriteRule ^zh-TW/(.*)$ /browser/zh-TW/$1 [L]
RewriteRule ^zh-TW/?$ /browser/zh-TW/index.html [L]

# Default English (fallback)
RewriteRule ^(.*)$ /browser/en-US/$1 [L]
```

### Apache Virtual Host with Language Detection

```apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/dist/angular-xlf-demo/browser
    
    RewriteEngine On
    
    # Language detection for root requests
    RewriteCond %{HTTP:Accept-Language} ^es [NC]
    RewriteRule ^/?$ /es/ [R=302,L]
    
    RewriteCond %{HTTP:Accept-Language} ^fr [NC]
    RewriteRule ^/?$ /fr/ [R=302,L]
    
    RewriteCond %{HTTP:Accept-Language} ^ms [NC]
    RewriteRule ^/?$ /my/ [R=302,L]
    
    RewriteCond %{HTTP:Accept-Language} ^zh-TW [NC]
    RewriteRule ^/?$ /zh-TW/ [R=302,L]
    
    RewriteCond %{HTTP:Accept-Language} ^zh [NC]
    RewriteRule ^/?$ /zh/ [R=302,L]
    
    # Locale-specific rules
    RewriteRule ^es/(.*)$ es/$1 [L]
    RewriteRule ^fr/(.*)$ fr/$1 [L]
    RewriteRule ^my/(.*)$ my/$1 [L]
    RewriteRule ^zh/(.*)$ zh/$1 [L]
    RewriteRule ^zh-TW/(.*)$ zh-TW/$1 [L]
    
    # Default to English
    RewriteRule ^(.*)$ en-US/$1 [L]
    
    # Cache static assets
    <LocationMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header append Cache-Control "public, immutable"
    </LocationMatch>
</VirtualHost>
```

## 🐳 Docker Configuration

### Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist/angular-xlf-demo/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        # Language detection
        location = / {
            if ($http_accept_language ~* ^es) { return 302 /es/; }
            if ($http_accept_language ~* ^fr) { return 302 /fr/; }
            if ($http_accept_language ~* ^ms) { return 302 /my/; }
            if ($http_accept_language ~* ^zh-TW) { return 302 /zh-TW/; }
            if ($http_accept_language ~* ^zh) { return 302 /zh/; }
            try_files $uri /en-US/index.html;
        }

        location /es/ { alias /usr/share/nginx/html/es/; try_files $uri /es/index.html; }
        location /fr/ { alias /usr/share/nginx/html/fr/; try_files $uri /fr/index.html; }
        location /my/ { alias /usr/share/nginx/html/my/; try_files $uri /my/index.html; }
        location /zh/ { alias /usr/share/nginx/html/zh/; try_files $uri /zh/index.html; }
        location /zh-TW/ { alias /usr/share/nginx/html/zh-TW/; try_files $uri /zh-TW/index.html; }
        
        location / { try_files $uri /en-US/index.html; }
    }
}
```

## ☁️ Cloud Platform Configurations

### Netlify (_redirects file)

```
# Language detection
/  /es/  302  Language=es
/  /fr/  302  Language=fr  
/  /my/  302  Language=ms
/  /zh/  302  Language=zh
/  /zh-TW/  302  Language=zh-TW

# Serve locale-specific builds
/es/*  /es/:splat  200
/fr/*  /fr/:splat  200
/my/*  /my/:splat  200
/zh/*  /zh/:splat  200
/zh-TW/*  /zh-TW/:splat  200

# Default English fallback
/*  /en-US/:splat  200
```

### Vercel (vercel.json)

```json
{
  "routes": [
    {
      "src": "^/es/(.*)",
      "dest": "/es/$1"
    },
    {
      "src": "^/fr/(.*)",
      "dest": "/fr/$1"
    },
    {
      "src": "^/my/(.*)", 
      "dest": "/my/$1"
    },
    {
      "src": "^/zh/(.*)",
      "dest": "/zh/$1"
    },
    {
      "src": "^/zh-TW/(.*)",
      "dest": "/zh-TW/$1"
    },
    {
      "src": "^/(.*)",
      "dest": "/en-US/$1"
    }
  ]
}
```

### AWS CloudFront Lambda@Edge

```javascript
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const uri = request.uri;
    
    // Only redirect root requests
    if (uri === '/') {
        const acceptLanguage = headers['accept-language']?.[0]?.value || '';
        
        if (acceptLanguage.includes('es')) {
            return callback(null, {
                status: '302',
                statusDescription: 'Found',
                headers: { location: [{ key: 'Location', value: '/es/' }] }
            });
        }
        if (acceptLanguage.includes('fr')) {
            return callback(null, {
                status: '302', 
                statusDescription: 'Found',
                headers: { location: [{ key: 'Location', value: '/fr/' }] }
            });
        }
        // Add more languages as needed
    }
    
    // Route to appropriate locale folder
    if (uri.startsWith('/es/')) {
        request.uri = uri.replace('/es', '/es');
    } else if (uri.startsWith('/fr/')) {
        request.uri = uri.replace('/fr', '/fr');
    } else {
        request.uri = uri.replace(/^\//, '/en-US/');
    }
    
    callback(null, request);
};
```

## 🚀 Deployment Scripts

### Simple Deploy Script

```bash
#!/bin/bash

echo "🏗️  Building Angular i18n application..."

# Build all locales with single command
npm run build

echo "📦 Deploying to server..."

# Example: Deploy to server via rsync
rsync -avz --delete \
  dist/angular-xlf-demo/browser/ \
  user@server:/var/www/html/

# Example: Deploy to AWS S3 + CloudFront
# aws s3 sync dist/angular-xlf-demo/browser/ s3://your-bucket/ --delete
# aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 Available at:"
echo "   English:  https://example.com/"
echo "   Spanish:  https://example.com/es/"
echo "   French:   https://example.com/fr/"
echo "   Malay:    https://example.com/my/"
echo "   Chinese:  https://example.com/zh/"
echo "   Trad. Chinese: https://example.com/zh-TW/"
```

### CI/CD Pipeline Example (GitHub Actions)

```yaml
name: Deploy Angular i18n App

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build all locales
      run: npm run build
    
    - name: Deploy to server
      run: |
        rsync -avz --delete \
          dist/angular-xlf-demo/browser/ \
          ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/var/www/html/
```

## 📊 Performance Benefits

The Angular i18n approach provides significant performance benefits:

- **Pre-compiled translations** - no runtime translation overhead
- **Smaller bundles per language** - users only download their language
- **Better SEO** - each language has its own URL structure  
- **Faster initial load** - no additional HTTP requests for translation files
- **Tree-shaking friendly** - unused translations are removed

## 🔧 Troubleshooting

### Common Issues

1. **404 errors for language routes**
   - Ensure server configuration includes all locale paths
   - Check that build output contains all expected locale folders

2. **Base href issues**
   - Angular automatically sets base href per locale
   - Ensure server serves files relative to locale folder

3. **Language detection not working**
   - Verify Accept-Language header parsing in server config
   - Test with different browser language settings

4. **Assets not loading**
   - Check that asset paths are relative to base href
   - Ensure server serves static files from correct locale folders

This configuration demonstrates the modern, official Angular i18n deployment approach that is both performant and scalable.