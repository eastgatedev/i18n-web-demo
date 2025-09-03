import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-demo';

  // Pluralization counters
  itemCount = 0;
  userCount = 1;
  notificationCount = 0;

  // Smart Variable Naming Test Data
  userProfile = {
    profile: { firstName: 'Sarah', lastName: 'Johnson' },
    getStatus: () => 'premium',
    notifications: { count: 5 }
  };

  orderData = {
    id: 'ORD-12345',
    customer: { name: 'Alex Smith' },
    shippingStatus: 'shipped',
    getShippingStatus(): string { return this.shippingStatus; }
  };

  systemData = {
    items: [{ name: 'Product A' }],
    PROCESSING_STATUS: 'ACTIVE',
    getCurrentTime: () => new Date().toLocaleTimeString()
  };

  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('en');

    // Use a language
    translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  // Counter methods
  incrementCount(counter: 'item' | 'user' | 'notification') {
    switch (counter) {
      case 'item':
        this.itemCount++;
        break;
      case 'user':
        this.userCount++;
        break;
      case 'notification':
        this.notificationCount++;
        break;
    }
  }

  decrementCount(counter: 'item' | 'user' | 'notification') {
    switch (counter) {
      case 'item':
        this.itemCount = Math.max(0, this.itemCount - 1);
        break;
      case 'user':
        this.userCount = Math.max(0, this.userCount - 1);
        break;
      case 'notification':
        this.notificationCount = Math.max(0, this.notificationCount - 1);
        break;
    }
  }

  // Template literals for Smart Variable Naming testing
  // These demonstrate what the plugin should generate when extracting:
  
  // BEFORE: Template literal (select this for extraction)
  get welcomeMessage(): string {
    return `Welcome ${this.userProfile.profile.firstName}! You have ${this.userProfile.notifications.count} notifications`;
  }
  
  // AFTER: What Smart Variable Naming should generate (example - don't use this directly)
  // this.translate.get('welcome.message', {
  //   profileFirstName: this.userProfile.profile.firstName,
  //   notificationsCount: this.userProfile.notifications.count
  // })
  // Translation file: "Welcome {profileFirstName}! You have {notificationsCount} notifications"

  get orderStatusMessage(): string {
    return `Order #${this.orderData.id} for ${this.orderData.customer.name} is ${this.orderData.getShippingStatus()}`;
  }
  
  // Expected Smart Variable Naming result:
  // this.translate.get('order.status', {
  //   orderId: this.orderData.id,
  //   customerName: this.orderData.customer.name,
  //   shippingStatus: this.orderData.getShippingStatus()
  // })
  // Translation file: "Order #{orderId} for {customerName} is {shippingStatus}"

  get systemStatusMessage(): string {
    return `Processing ${this.systemData.items[0].name} with status ${this.systemData.PROCESSING_STATUS} at ${this.systemData.getCurrentTime()}`;
  }
  
  // Expected Smart Variable Naming result:
  // this.translate.get('system.status', {
  //   itemName: this.systemData.items[0].name,
  //   processingStatus: this.systemData.PROCESSING_STATUS,
  //   currentTime: this.systemData.getCurrentTime()
  // })
  // Translation file: "Processing {itemName} with status {processingStatus} at {currentTime}"

  refreshTime() {
    this.systemData.getCurrentTime = () => new Date().toLocaleTimeString();
  }
}
