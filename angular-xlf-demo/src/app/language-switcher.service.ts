import { Injectable, LOCALE_ID, Inject } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageSwitcherService {
  
  public readonly languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'my', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' }
  ];

  constructor(@Inject(LOCALE_ID) private currentLocale: string) {}

  getCurrentLanguage(): Language {
    // Angular i18n LOCALE_ID returns locale codes like 'en-US', 'es', etc.
    // We need to map these to our language codes
    let localeCode = this.currentLocale.split('-')[0]; // Convert 'en-US' to 'en'
    
    // Handle special case for Traditional Chinese
    if (this.currentLocale === 'zh-TW') {
      localeCode = 'zh-TW';
    }
    
    return this.languages.find(lang => lang.code === localeCode) || this.languages[0];
  }

  getCurrentLocaleCode(): string {
    return this.currentLocale;
  }

  switchLanguage(languageCode: string): void {
    // Angular i18n creates separate builds with specific URL structures:
    // - English (default): myapp.com/
    // - Spanish: myapp.com/es/  
    // - French: myapp.com/fr/
    // etc.
    
    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;
    
    // Extract the path without the locale prefix
    let path = window.location.pathname;
    
    // Remove existing locale prefix if present
    const localeRegex = /^\/(en-US|es|fr|my|zh|zh-TW)\//;
    const pathWithoutLocale = path.replace(localeRegex, '/');
    
    // Construct new URL following Angular's official deployment structure
    let newUrl: string;
    if (languageCode === 'en') {
      // English uses en-US as source locale, served from root
      newUrl = `${baseUrl}${pathWithoutLocale}`;
    } else {
      // Other languages follow /locale/ pattern as per Angular docs
      newUrl = `${baseUrl}/${languageCode}${pathWithoutLocale}`;
    }
    
    // For development/demo, show the intended production URL structure
    if (languageCode !== this.getCurrentLanguage().code) {
      const message = `Production URL structure:\n${newUrl}\n\nThe Angular i18n approach uses:\n• ng build --localize (builds all languages in one command)\n• Separate URL paths per language\n• Server-side Accept-Language detection\n• Pre-optimized builds for better performance`;
      
      alert(message);
      
      // In production with proper server configuration, you would use:
      // window.location.href = newUrl;
    }
  }

  getLanguageByCode(code: string): Language | undefined {
    return this.languages.find(lang => lang.code === code);
  }

  /**
   * Demo function showing how Accept-Language header detection works
   * In production, this would be handled server-side
   */
  detectPreferredLanguage(): string {
    // Get browser's language preferences
    const browserLanguages = navigator.languages || [navigator.language];
    
    // Map common language codes to our supported locales
    const languageMap: Record<string, string> = {
      'en': 'en',
      'en-US': 'en', 
      'en-GB': 'en',
      'es': 'es',
      'es-ES': 'es',
      'es-MX': 'es',
      'fr': 'fr', 
      'fr-FR': 'fr',
      'fr-CA': 'fr',
      'ms': 'my',
      'ms-MY': 'my',
      'zh': 'zh',
      'zh-CN': 'zh',
      'zh-TW': 'zh-TW',
      'zh-HK': 'zh-TW'
    };

    // Find first supported language
    for (const browserLang of browserLanguages) {
      const mappedLang = languageMap[browserLang.toLowerCase()];
      if (mappedLang && this.languages.find(lang => lang.code === mappedLang)) {
        return mappedLang;
      }
    }

    // Fallback to English
    return 'en';
  }

  /**
   * Demo function showing detected language info
   * In production, server would handle this automatically
   */
  showLanguageDetectionDemo(): void {
    const detected = this.detectPreferredLanguage();
    const detectedLang = this.getLanguageByCode(detected);
    const browserLangs = navigator.languages?.join(', ') || navigator.language;
    
    const message = `🌐 Accept-Language Detection Demo\n\nBrowser Languages: ${browserLangs}\nDetected Best Match: ${detectedLang?.name} (${detected})\n\nIn production:\n• Server detects Accept-Language header\n• Redirects to appropriate /locale/ path\n• Or serves default language with language selector`;
    
    alert(message);
  }
}