import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs';
import { Sensor, SensorResponse } from '../models/sensor';

@UntilDestroy()
@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SensorsComponent implements OnInit {

  sensorList: Sensor[] = [];

  constructor(
    private api: ApiService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadSensors();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  loadSensors() {
    this.api.getSensors()
      .pipe(
        untilDestroyed(this),
        map((x: SensorResponse) => {
          return x.sensors;
        }),
        tap(async (x: Sensor[]) => {
          this.sensorList = [];
          const sensorCount = Object.keys(x).length;
          for (let index = 0; index < sensorCount; index++) {
            const sensor = x[index];
            this.sensorList.push(sensor)
          }
          await this.presentToast(`Got ${sensorCount} sensors!`)
        })
      ).subscribe();
  }

}
