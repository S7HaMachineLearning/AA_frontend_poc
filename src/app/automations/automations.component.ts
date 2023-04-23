import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Automation, AutomationResponse } from '../models/automation';
import { ApiService } from '../services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-automations',
  templateUrl: './automations.component.html',
  styleUrls: ['./automations.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AutomationsComponent implements OnInit {

  automationList: Automation[] = [];

  constructor(
    private api: ApiService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadAutomations();
  }

  async presentToast(message: string, color: string = "dark", duration: number = 1500) {
    const toast = await this.toastController.create({
      message: message,
      duration,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  loadAutomations() {
    this.api.getAutomations()
      .pipe(
        untilDestroyed(this),
        map((x: AutomationResponse) => {
          return x.automations;
        }),
        tap(async (x: Automation[]) => {
          this.automationList = [];
          const automationsCount = Object.keys(x).length;
          for (let index = 0; index < automationsCount; index++) {
            const sensor = x[index];
            this.automationList.push(sensor)
          }
          await this.presentToast(`Got ${automationsCount} automations!`)
        }),
        catchError(async (err) => {
          console.warn('KAPOT');
          await this.presentToast(`Error: ${err.message}`, "danger", 5000)
        })
      ).subscribe();
  }

}
