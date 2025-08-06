import { Component, signal } from '@angular/core';
import { NgForOf } from '@angular/common';
import { LanguageSwitcherService, Language } from './language-switcher.service';

@Component({
  selector: 'app-root',
  imports: [NgForOf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-xlf-demo');
  
  constructor(private languageSwitcher: LanguageSwitcherService) {}

  get languages(): Language[] {
    return this.languageSwitcher.languages;
  }

  get currentLanguage(): Language {
    return this.languageSwitcher.getCurrentLanguage();
  }

  switchLanguage(languageCode: string): void {
    this.languageSwitcher.switchLanguage(languageCode);
  }

  isCurrentLanguage(languageCode: string): boolean {
    return this.currentLanguage.code === languageCode;
  }

  showLanguageDetection(): void {
    this.languageSwitcher.showLanguageDetectionDemo();
  }
}
