import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsMapTypeId, GoogleMapsAnimation } from '@ionic-native/google-maps'; 
//, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { DriverProvider } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  map: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform) { 
       this.platform.ready();
       this.loadMap();
     
  }

  async ngOnInit() {
    
   
  }
  latitude: any;
  longitude: any;

  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {

       this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.map = GoogleMaps.create('map', {
        camera: {
          target: {
            lat: this.latitude,
            lng: this.latitude
          },
          zoom: 19
        },
        mapType: GoogleMapsMapTypeId.ROADMAP,
      });

      this.map.addMarker({
        position: {lat: this.latitude, lng: this.latitude},
        title: 'This is You!',
        animation: GoogleMapsAnimation.BOUNCE
      });
    });
  }

  centerLocation(){
    let position = {lat: this.latitude, lng: this.latitude};
    this.map.setCenter(position);
    this.map.setZoom(this.map.getZoom());
  }

  
}




