import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Automation, AutomationResponse } from '../models/automation';
import { ApiService } from '../services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs';

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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
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
        })
      ).subscribe();
  }

}
