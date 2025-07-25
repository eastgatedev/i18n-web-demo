<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function switchLanguage(lang: string) {
  locale.value = lang
}
</script>

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

<style scoped>
.language-switcher {
  margin: 20px 0;
}
.language-switcher button {
  margin: 0 5px;
}
</style>
