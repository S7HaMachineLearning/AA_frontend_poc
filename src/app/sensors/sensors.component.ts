import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadSensors();
  }

  loadSensors() {
    this.api.getSensors()
      .pipe(
        untilDestroyed(this),
        map((x: SensorResponse) => {
          return x.sensors;
        }),
        tap((x: Sensor[]) => {
          this.sensorList = [];
          for (let index = 0; index < Object.keys(x).length; index++) {
            const sensor = x[index];
            this.sensorList.push(sensor)
          }       
        })
      ).subscribe();
  }

}
