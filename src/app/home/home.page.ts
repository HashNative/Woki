import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;
  loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform) { 
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 6.874495,
          lng: 79.879188
        },
        zoom: 18,
        tilt: 30
      }
    });
  }

}

















// async function presentAlert() {
    
  //   const alertController = document.querySelector('ion-alert-controller');
  //   await alertController.componentOnReady();
  
  //   const alert = await alertController.create({
  //     header: 'Alert',
  //     subHeader: 'Subtitle',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });
  //   return await alert.present();
  // }

