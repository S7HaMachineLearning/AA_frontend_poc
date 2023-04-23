import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Sensor', url: '/sensors', icon: 'settings' },
    { title: 'Automations', url: '/automations', icon: 'play' },
    { title: 'Random', url: '/random', icon: 'shuffle'}
  ];
  constructor() {}
}
