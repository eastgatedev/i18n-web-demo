import { useState } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from "next/image";
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation(['common', 'homepage', 'plurals']);
  const [itemCount, setItemCount] = useState(0);
  const [userCount, setUserCount] = useState(1);
  const [notificationCount, setNotificationCount] = useState(0);

  // Smart Variable Naming Test Data
  const [userProfile, setUserProfile] = useState({
    profile: { firstName: 'Sarah', lastName: 'Johnson' },
    getStatus: () => 'premium',
    notifications: { count: 5 }
  });
  
  const [orderData, setOrderData] = useState({
    id: 'ORD-12345',
    customer: { name: 'Alex Smith' },
    getShippingStatus: () => 'shipped'
  });

  const [systemData, setSystemData] = useState({
    items: [{ name: 'Product A' }],
    PROCESSING_STATUS: 'ACTIVE',
    getCurrentTime: () => new Date().toLocaleTimeString()
  });

  // Template literals for Smart Variable Naming testing
  const welcomeMessage = `Welcome ${userProfile.profile.firstName}! You have ${userProfile.notifications.count} notifications`;
  const orderStatusMessage = `Order #${orderData.id} for ${orderData.customer.name} is ${orderData.getShippingStatus()}`;
  const systemStatusMessage = `Processing ${systemData.items[0].name} with status ${systemData.PROCESSING_STATUS} at ${systemData.getCurrentTime()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mb-2">
                i18NEXT
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t('homepage:title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('homepage:description')}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Language Switcher */}
          <div className="md:col-span-2">
            <LanguageSwitcher />
          </div>

          {/* Features Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              🚀 {t('homepage:features.fast')}
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              ⚡ {t('homepage:features.modern')}
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              📈 {t('homepage:features.scalable')}
            </h2>
          </div>

          {/* Pluralization Demo */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              🔢 Pluralization Demo
            </h2>
            
            <div className="space-y-4">
              {/* Items Counter */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-lg mb-2">
                  {t('plurals:item', { count: itemCount })}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setItemCount(Math.max(0, itemCount - 1))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                    {itemCount}
                  </span>
                  <button
                    onClick={() => setItemCount(itemCount + 1)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Users Counter */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="text-lg mb-2">
                  {t('plurals:user', { count: userCount })}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUserCount(Math.max(0, userCount - 1))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                    {userCount}
                  </span>
                  <button
                    onClick={() => setUserCount(userCount + 1)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Notifications Counter */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-lg mb-2">
                  {t('plurals:notification', { count: notificationCount })}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNotificationCount(Math.max(0, notificationCount - 1))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                    {notificationCount}
                  </span>
                  <button
                    onClick={() => setNotificationCount(notificationCount + 1)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Variable Naming Test Demo */}
          <div className="md:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              🧠 Smart Variable Naming Test
            </h2>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Use the <strong>Smart Text to i18n</strong> plugin on these template literals to see semantic variable naming in action!
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {/* User Profile Section */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">👤 User Profile</h4>
                  <div className="space-y-2 mb-3">
                    <input 
                      type="text" 
                      value={userProfile.profile.firstName}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        profile: { ...prev.profile, firstName: e.target.value }
                      }))}
                      className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="First Name"
                    />
                    <input 
                      type="number" 
                      value={userProfile.notifications.count}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        notifications: { count: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Notification Count"
                    />
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded text-sm">
                    <strong>Template:</strong>
                    <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {welcomeMessage}
                    </code>
                  </div>
                </div>

                {/* Order Status Section */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                  <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">📦 Order Status</h4>
                  <div className="space-y-2 mb-3">
                    <input 
                      type="text" 
                      value={orderData.customer.name}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        customer: { name: e.target.value }
                      }))}
                      className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Customer Name"
                    />
                    <select 
                      value={orderData.getShippingStatus()}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        getShippingStatus: () => e.target.value
                      }))}
                      className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="shipped">Shipped</option>
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded text-sm">
                    <strong>Template:</strong>
                    <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {orderStatusMessage}
                    </code>
                  </div>
                </div>

                {/* System Status Section */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">⚙️ System Status</h4>
                  <div className="space-y-2 mb-3">
                    <input 
                      type="text" 
                      value={systemData.items[0].name}
                      onChange={(e) => setSystemData(prev => ({
                        ...prev,
                        items: [{ name: e.target.value }]
                      }))}
                      className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Item Name"
                    />
                    <button
                      onClick={() => setSystemData(prev => ({
                        ...prev,
                        getCurrentTime: () => new Date().toLocaleTimeString()
                      }))}
                      className="w-full px-2 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Refresh Time
                    </button>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded text-sm">
                    <strong>Template:</strong>
                    <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {systemStatusMessage}
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">🎯 How to Test Smart Variable Naming:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>Select any template literal code above (the code inside the gray boxes)</li>
                  <li>Use the "Smart Text to i18n" plugin feature</li>
                  <li>Compare the generated placeholders:</li>
                </ol>
                <div className="mt-3 grid md:grid-cols-2 gap-4 text-xs">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded">
                    <strong className="text-red-800 dark:text-red-200">❌ Generic (Old):</strong>
                    <code className="block mt-1">"Welcome {`{0}`}! You have {`{1}`} notifications"</code>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <strong className="text-green-800 dark:text-green-200">✅ Smart (New):</strong>
                    <code className="block mt-1">"Welcome {`{profileFirstName}`}! You have {`{notificationsCount}`} notifications"</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="md:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/20">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              🔧 Next.js + next-i18next Demo
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Features Demonstrated:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✅ 6 Language Support</li>
                  <li>✅ Dynamic Language Switching</li>
                  <li>✅ Pluralization (next-i18next style)</li>
                  <li>🧠 Smart Variable Naming Test</li>
                  <li>✅ Static Generation with getStaticProps</li>
                  <li>✅ Browser Language Detection</li>
                  <li>✅ URL-based Locale Routing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Architecture:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>🏗️ Next.js Pages Router</li>
                  <li>📦 next-i18next Library</li>
                  <li>🌐 Server-Side Translation Loading</li>
                  <li>📁 JSON Translation Files</li>
                  <li>🔄 Runtime Language Switching</li>
                  <li>🎨 Tailwind CSS Styling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <div className="flex justify-center items-center gap-4 mb-4">
            <a
              href="https://nextjs.org/docs/advanced-features/i18n-routing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/next.svg"
                alt="Next.js"
                width={20}
                height={20}
                className="dark:invert"
              />
              Next.js i18n Docs
            </a>
            <a
              href="https://github.com/i18next/next-i18next"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/globe.svg"
                alt="GitHub"
                width={16}
                height={16}
                className="dark:invert"
              />
              next-i18next GitHub
            </a>
          </div>
          <p>{t('common:welcome')}</p>
        </footer>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'homepage',
        'plurals',
      ])),
    },
  };
};
