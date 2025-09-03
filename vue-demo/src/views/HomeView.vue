<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

onMounted(() => {
  // Component mounted successfully
})

const itemCount = ref(0)
const userCount = ref(1)
const notificationCount = ref(0)

// Smart Variable Naming Test Data
const userProfile = ref({
  profile: { firstName: 'Sarah', lastName: 'Johnson' },
  getStatus: () => 'premium',
  notifications: { count: 5 }
})

const orderData = ref({
  id: 'ORD-12345',
  customer: { name: 'Alex Smith' },
  shippingStatus: 'shipped',
  getShippingStatus() { return this.shippingStatus }
})

const systemData = ref({
  items: [{ name: 'Product A' }],
  PROCESSING_STATUS: 'ACTIVE',
  getCurrentTime: () => new Date().toLocaleTimeString()
})

// Computed template literals for testing
const welcomeMessage = computed(() => 
  `Welcome ${userProfile.value.profile.firstName}! You have ${userProfile.value.notifications.count} notifications`
)
const orderStatusMessage = computed(() => 
  `Order #${orderData.value.id} for ${orderData.value.customer.name} is ${orderData.value.getShippingStatus()}`
)
const systemStatusMessage = computed(() => 
  `Processing ${systemData.value.items[0].name} with status ${systemData.value.PROCESSING_STATUS} at ${systemData.value.getCurrentTime()}`
)

const incrementCount = (counter: 'item' | 'user' | 'notification') => {
  switch (counter) {
    case 'item':
      itemCount.value++
      break
    case 'user':
      userCount.value++
      break
    case 'notification':
      notificationCount.value++
      break
  }
}

const decrementCount = (counter: 'item' | 'user' | 'notification') => {
  switch (counter) {
    case 'item':
      itemCount.value = Math.max(0, itemCount.value - 1)
      break
    case 'user':
      userCount.value = Math.max(0, userCount.value - 1)
      break
    case 'notification':
      notificationCount.value = Math.max(0, notificationCount.value - 1)
      break
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <div class="text-center">
            <div class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
              VUE.JS
            </div>
          </div>
        </div>
        <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {{ $t('homepage.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('homepage.description') }}
        </p>
      </header>

      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Language Switcher -->
        <div class="md:col-span-2">
          <LanguageSwitcher />
        </div>

        <!-- Features Section -->
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🚀 {{ $t('homepage.features.fast') }}
          </h2>
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            ⚡ {{ $t('homepage.features.modern') }}
          </h2>
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            📈 {{ $t('homepage.features.scalable') }}
          </h2>
        </div>

        <!-- Pluralization Demo -->
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🔢 Pluralization Demo
          </h2>

          <div class="space-y-4">
            <!-- Items Counter -->
            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p class="text-lg mb-2">
                {{ $tc('plurals.item', itemCount) }}
              </p>
              <div class="flex gap-2">
                <button
                  @click="decrementCount('item')"
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
                <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                  {{ itemCount }}
                </span>
                <button
                  @click="incrementCount('item')"
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Users Counter -->
            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded">
              <p class="text-lg mb-2">
                {{ $tc('plurals.user', userCount) }}
              </p>
              <div class="flex gap-2">
                <button
                  @click="decrementCount('user')"
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
                <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                  {{ userCount }}
                </span>
                <button
                  @click="incrementCount('user')"
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Notifications Counter -->
            <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p class="text-lg mb-2">
                {{ $tc('plurals.notification', notificationCount) }}
              </p>
              <div class="flex gap-2">
                <button
                  @click="decrementCount('notification')"
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
                <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                  {{ notificationCount }}
                </span>
                <button
                  @click="incrementCount('notification')"
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Smart Variable Naming Test Demo -->
        <div class="md:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🧠 Smart Variable Naming Test
          </h2>
          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Use the <strong>Smart Text to i18n</strong> plugin on these template literals to see semantic variable naming in action!
            </p>
            <div class="grid md:grid-cols-3 gap-4">
              <!-- User Profile Section -->
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 class="font-semibold mb-2 text-blue-800 dark:text-blue-200">👤 User Profile</h4>
                <div class="space-y-2 mb-3">
                  <input 
                    type="text" 
                    v-model="userProfile.profile.firstName"
                    class="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="First Name"
                  />
                  <input 
                    type="number" 
                    v-model.number="userProfile.notifications.count"
                    class="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Notification Count"
                  />
                </div>
                <div class="p-3 bg-white dark:bg-gray-800 rounded text-sm">
                  <strong>Template:</strong>
                  <code class="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {{ welcomeMessage }}
                  </code>
                </div>
              </div>

              <!-- Order Status Section -->
              <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                <h4 class="font-semibold mb-2 text-green-800 dark:text-green-200">📦 Order Status</h4>
                <div class="space-y-2 mb-3">
                  <input 
                    type="text" 
                    v-model="orderData.customer.name"
                    class="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Customer Name"
                  />
                  <select 
                    v-model="orderData.shippingStatus"
                    class="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="shipped">Shipped</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <div class="p-3 bg-white dark:bg-gray-800 rounded text-sm">
                  <strong>Template:</strong>
                  <code class="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {{ orderStatusMessage }}
                  </code>
                </div>
              </div>

              <!-- System Status Section -->
              <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
                <h4 class="font-semibold mb-2 text-purple-800 dark:text-purple-200">⚙️ System Status</h4>
                <div class="space-y-2 mb-3">
                  <input 
                    type="text" 
                    v-model="systemData.items[0].name"
                    class="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Item Name"
                  />
                  <button
                    @click="systemData.getCurrentTime = () => new Date().toLocaleTimeString()"
                    class="w-full px-2 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Refresh Time
                  </button>
                </div>
                <div class="p-3 bg-white dark:bg-gray-800 rounded text-sm">
                  <strong>Template:</strong>
                  <code class="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {{ systemStatusMessage }}
                  </code>
                </div>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <h4 class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">🎯 How to Test Smart Variable Naming:</h4>
              <ol class="list-decimal list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                <li>Select any template literal code above (the code inside the gray boxes)</li>
                <li>Use the "Smart Text to i18n" plugin feature</li>
                <li>Compare the generated placeholders:</li>
              </ol>
              <div class="mt-3 grid md:grid-cols-2 gap-4 text-xs">
                <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <strong class="text-red-800 dark:text-red-200">❌ Generic (Old):</strong>
                  <code class="block mt-1">"Welcome {0}! You have {1} notifications"</code>
                </div>
                <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <strong class="text-green-800 dark:text-green-200">✅ Smart (New):</strong>
                  <code class="block mt-1">"Welcome {profileFirstName}! You have {notificationsCount} notifications"</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical Info -->
        <div class="md:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🔧 Vue.js + vue-i18n Demo
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                Features Demonstrated:
              </h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li>✅ 6 Language Support</li>
                <li>✅ Dynamic Language Switching</li>
                <li>✅ Pluralization (vue-i18n style)</li>
                <li>🧠 Smart Variable Naming Test</li>
                <li>✅ Composition API</li>
                <li>✅ Browser Language Detection</li>
                <li>✅ Reactive State Management</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                Architecture:
              </h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li>🏗️ Vue 3 Composition API</li>
                <li>📦 vue-i18n Library</li>
                <li>⚡ Vite Build Tool</li>
                <li>📁 JSON Translation Files</li>
                <li>🔄 Runtime Language Switching</li>
                <li>🎨 Tailwind CSS Styling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-12 text-center text-gray-600 dark:text-gray-400">
        <div class="flex justify-center items-center gap-4 mb-4">
          <a
            href="https://vuejs.org/guide/i18n"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 hover:underline"
          >
            <span class="w-5 h-5 text-green-500 font-bold text-sm">V</span>
            Vue.js i18n Guide
          </a>
          <a
            href="https://github.com/intlify/vue-i18n-next"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 hover:underline"
          >
            <svg class="w-4 h-4 dark:invert" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
            </svg>
            vue-i18n GitHub
          </a>
        </div>
        <p>{{ $t('common.welcome') }}</p>
      </footer>
    </div>
  </div>
</template>
