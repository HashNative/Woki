import { Component, ViewChild, OnInit } from '@angular/core';
import {} from 'google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapElement;
  map: any;

  constructor() {

  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    let coords = new google.maps.LatLng(6.874478, 79.879220);

    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

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

