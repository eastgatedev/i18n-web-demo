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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
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
