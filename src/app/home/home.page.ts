import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation, GoogleMapsMapTypeId } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: any;
  loading: any;
  marker:any;

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
    var image = 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';
    
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 6.874495,
          lng: 79.879188
        },
        zoom: 18,
        // tilt: 30,
      },
      mapType: GoogleMapsMapTypeId.ROADMAP
    });

    
    var marker = new google.maps.Marker({ // Set the marker
			position: new google.maps.LatLng(5.376964, 100.399383), // Position marker to coordinates
			icon:image, //use our image as the marker
			map: this.map, // assign the market to our map variable
			title: 'Click here for more details' // Marker ALT Text
    });
    
    marker.setMap(this.map);
    
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

