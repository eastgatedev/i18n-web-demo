import {useTranslations} from 'next-intl';
import Image from "next/image";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('homepage.title')}</h1>
          <p className="text-lg text-gray-600 mb-8">{t('homepage.description')}</p>
          <div className="flex justify-center">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-3">{t('common.welcome')}</h2>
          <p className="text-gray-700">
            This is a demonstration of next-intl with dynamic language switching.
            Use the language selector in the header to change languages.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('homepage.features.fast')}</h3>
            <p className="text-gray-600">Built with Next.js and optimized for performance.</p>
          </div>
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('homepage.features.modern')}</h3>
            <p className="text-gray-600">Using the latest React and TypeScript features.</p>
          </div>
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('homepage.features.scalable')}</h3>
            <p className="text-gray-600">Designed to scale with your application needs.</p>
          </div>
        </div>

        {/* Pluralization Demo */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Pluralization Examples</h3>
          <div className="space-y-2">
            <p>{t('plurals.items', {count: 0})}</p>
            <p>{t('plurals.items', {count: 1})}</p>
            <p>{t('plurals.items', {count: 5})}</p>
            <p>{t('plurals.users', {count: 0})}</p>
            <p>{t('plurals.users', {count: 1})}</p>
            <p>{t('plurals.users', {count: 10})}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-blue-600 hover:text-blue-800">{t('common.home')}</a>
          <a href="#" className="text-blue-600 hover:text-blue-800">{t('common.about')}</a>
          <a href="#" className="text-blue-600 hover:text-blue-800">{t('common.contact')}</a>
        </nav>
      </div>
    </div>
  );
}
