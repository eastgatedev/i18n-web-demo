#!/bin/bash

echo "🚀 Modern Angular i18n Build Process"
echo "======================================"

echo ""
echo "🏗️  Building all language versions with single command..."

# Modern single command build (Angular 9+)
time npm run build

echo ""
echo "✅ Modern build completed!"
echo ""
echo "📁 Modern build structure:"
ls -la dist/angular-xlf-demo/browser/

echo ""
echo "📊 Performance comparison:"
echo "   Modern (Angular 9+): ~5 seconds for all locales"
echo "   Legacy (Pre-9):      ~2-4 minutes for all locales"
echo ""
echo "🌐 To test the builds, you can serve them with:"
echo "   Method 1 - Individual locale testing:"
echo "     English:  serve -s dist/angular-xlf-demo/browser/en-US -p 3000"
echo "     Spanish:  serve -s dist/angular-xlf-demo/browser/es -p 3001"
echo "     French:   serve -s dist/angular-xlf-demo/browser/fr -p 3002"
echo "     Malay:    serve -s dist/angular-xlf-demo/browser/my -p 3003"
echo "     Chinese:  serve -s dist/angular-xlf-demo/browser/zh -p 3004"
echo "     Trad Chinese: serve -s dist/angular-xlf-demo/browser/zh-TW -p 3005"
echo ""
echo "   Method 2 - URL structure simulation:"
echo "     serve -s dist/angular-xlf-demo/browser -p 3000"
echo "     Then visit:"
echo "       http://localhost:3000/en-US/"
echo "       http://localhost:3000/es/"
echo "       http://localhost:3000/fr/"
echo "       etc."
echo ""
echo "💡 Install serve globally: npm install -g serve"
echo "📖 See server-config-examples.md for production deployment"
echo "📊 See performance-comparison.md for detailed analysis"