import { Routes } from '@angular/router';
import { SensorsComponent } from './sensors/sensors.component';
import { AutomationsComponent } from './automations/automations.component';
import { HomeComponent } from './home/home.component';
import { RandomComponent } from './random/random.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sensors',
    component: SensorsComponent

  },
  {
    path: 'automations',
    component: AutomationsComponent
  },
  {
    path: 'random',
    component: RandomComponent
  }
];
