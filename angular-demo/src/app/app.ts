import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-demo';

  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('en');
    
    // Use a language
    translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
