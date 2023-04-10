import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadAutomations();
   }

  loadAutomations() {
    this.api.getAutomations()
      .pipe(
        untilDestroyed(this),
        map((x: AutomationResponse) => {
          return x.automations;
        }),
        tap((x: Automation[]) => {
          this.automationList = [];
          for (let index = 0; index < Object.keys(x).length; index++) {
            const sensor = x[index];
            this.automationList.push(sensor)
          }       
        })
      ).subscribe();
  }

}
