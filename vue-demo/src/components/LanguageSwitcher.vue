<template>
  <div class="language-switcher bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-gray-200/20">
    <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
      {{ $t('common.language.switchLanguage') }}
    </h3>
    
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="language in languages"
        :key="language.code"
        @click="switchLanguage(language.code)"
        :class="`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentLocale === language.code
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`"
        :aria-label="`Switch to ${language.name}`"
      >
        <span class="mr-1">{{ language.flag }}</span>
        {{ language.name }}
      </button>
    </div>

    <button
      @click="detectPreferredLanguage"
      class="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors"
    >
      🌐 {{ $t('common.language.autoDetect') }}
    </button>

    <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
      <strong>{{ $t('common.language.currentLanguage') }}:</strong> {{ currentLocale.toUpperCase() }}
      <br />
      <strong>URL Structure:</strong> /{{ currentLocale === 'en' ? '' : currentLocale + '/' }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      languages: [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'MY', name: 'Bahasa Malaysia', flag: '🇲🇾' },
        { code: 'zh', name: '中文 (简体)', flag: '🇨🇳' },
        { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' },
      ]
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  },
  methods: {
    switchLanguage(languageCode) {
      this.$i18n.locale = languageCode
    },
    detectPreferredLanguage() {
      const browserLang = navigator.language;
      const supportedLang = this.languages.find(lang => 
        browserLang.startsWith(lang.code) || 
        browserLang === lang.code
      );
      
      if (supportedLang && supportedLang.code !== this.currentLocale) {
        this.switchLanguage(supportedLang.code);
      } else {
        alert(`Your browser language (${browserLang}) is already active or not supported. Supported languages: ${this.languages.map(l => l.code).join(', ')}`);
      }
    }
  }
})
</script>