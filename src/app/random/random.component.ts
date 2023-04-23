import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { Bored } from '../models/bored';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RandomComponent implements OnInit {

  boredItems: Bored[] = [];

  constructor(
    private api: ApiService,
    private toastController: ToastController
  ) { }

  ngOnInit() {

    this.getBoredItem();
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

  getBoredItem() {

    this.api.getBoredItem()
      .pipe(
        untilDestroyed(this),
        tap(x => {
          console.warn(x);
          this.boredItems.push(x);
        }),
        catchError(async (err) => {
          console.warn('KAPOT');
          await this.presentToast(`Error: ${err.message}`, "danger", 5000)
        })
      )
      .subscribe();

  }

}

