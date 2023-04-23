import { Component, OnInit } from '@angular/core';

import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, tap } from 'rxjs';

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
    private alertController: AlertController,
    private toastController: ToastController) { }

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

  async presentToast(message: string,color: string = "dark") {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  callAPI() {
    this.api.callApi()
      .pipe(
        untilDestroyed(this),
        tap(x => {
          if(x.result == "success") {

            this.presentAlert()
          }
        }),
        catchError(async (err) => {
          console.warn('KAPOT');
          await this.presentToast(`Error: ${err.message}`, "danger")
        })
      )
      .subscribe();
  }

}
