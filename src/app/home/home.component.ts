import { Component, OnInit } from '@angular/core';

import { AlertController, IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomeComponent implements OnInit {

  constructor(
    private api: ApiService,
    private alertController: AlertController) { }

  ngOnInit() { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'The API call was successful.',
      message: 'wauw',
      buttons: ['OK'],
    });
    await alert.present();
  }

  callAPI() {
    this.api.callApi()
      .pipe(
        untilDestroyed(this),
        tap(x => {
          if(x.result == "success") {

            this.presentAlert()
          }
        })
      )
      .subscribe();
  }

}
