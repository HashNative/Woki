import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsMapTypeId, GoogleMapsAnimation,
         Marker, GoogleMapOptions, CircleOptions, Circle } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { Geofence } from '@ionic-native/geofence/ngx';

declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  public map: GoogleMap;
  public lat: any;
  public lng: any;
  public speed = '0';
  public marker: any;
  public watch: any;
  circle: Circle;

  constructor(
      private alertController: AlertController,
      private geolocation: Geolocation,
      private platform: Platform,
      private modal: ModalController,
      public zone: NgZone,
      private geofence: Geofence) {
    geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
    );
  }

  async ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
      this.startTracking();
    });
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.lat,
            lng: this.lng
          },
          zoom: 18
        },
        mapType: GoogleMapsMapTypeId.ROADMAP
      }
      this.map = GoogleMaps.create('map', mapOptions);
      // let service = new google.maps.places.PlacesService(this.map);
      // service.nearbySearch({
      //   location: {lat: this.lat, lng: this.lng},
      //   radius: 100,
      //   type: ['restaurant']
      // }, (results, status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {
      //     for (var i = 0; i < results.length; i++) {
      //       console.log(results[i].name);
      //       this.addGeofence(results[i].id, i + 1, results[i].geometry.location.lat(), results[i].geometry.location.lng(), results[i].name, results[i].vicinity);
      //     }
      //   }
      // });
      this.addMarker();
    }, (err) => {
      console.log(err);
    });
  }

  async showAlert3() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [
        {
          text: 'Home',
          role: 'home'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'ok'
        }
      ],
      animated: true
    });
    return await alert.present();
  }
  async centerLocation(lat = null, lng = null) {
    let location = {
      lat: this.lat,
      lng: this.lng
    };

    if (lat && lng) {
      location = {
        lat: lat,
        lng: lng
      };
    }
    // this.map.setCameraTarget(location);

    this.map.animateCamera({
      target: location,
      zoom: 18,
      bearing: 140,
      duration: 5000,
      padding: 0  // default = 20px
    }).then(() => {

    });


  }
  async placeMarker() {

    let sets = this.map.addMarkerSync({
      title: 'Ionic',
      animation: GoogleMapsAnimation.BOUNCE,
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    console.log(sets.getId());
  }
  async searchModal() {

    const modal = await this.modal.create({
      component: SearchModalPage
    });
    return await modal.present();
  }
  startTracking() {
    let options = {
      frequency: 500,
      enableHighAccuracy: true
    };
    this.watch = this.geolocation.watchPosition(options).subscribe((position) => {
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.marker.setPosition( { lat: this.lat, lng: this.lng });
        // this.centerLocation(this.lat, this.lng);
        this.speed = ( +position.coords.speed * 3.6 ) + 'Km/h';
        if (this.circle) {
          this.addCircle();
        }
      });

    });

  }
  async addMarker() {

    this.marker = this.map.addMarkerSync({
      title: 'Ionic',
      animation: GoogleMapsAnimation.BOUNCE,
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });

  }
  async showAlert4() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: this.lat,
      buttons: [
        {
          text: 'Home',
          role: 'home'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'ok'
        }
      ],
      animated: true
    });
    return await alert.present();
  }
  async addCircle() {
    if (this.circle) {this.circle.remove(); }
    let options: CircleOptions = {
      'center': {'lat' : this.lat, 'lng' : this.lng},
      'radius': 300,
      'strokeColor' : '#528BE2',
      'strokeWidth': 1,
      'fillColor' : '#d5e2ff'
    };

    this.map.addCircle(options).then((circle: Circle) => {
        this.circle = circle;
    });
  }



  // Geo fence

  private addGeofence(id, idx, lat, lng, place, desc) {
    let fence = {
      id: id,
      latitude: lat,
      longitude: lng,
      radius: 50,
      transitionType: 3,
      notification: {
        id: idx,
        title: 'You crossed ' + place,
        text: desc,
        openAppOnClick: true
      }
    }

    this.geofence.addOrUpdate(fence).then(
        () => console.log('Geofence added'),
        (err) => console.log('Geofence failed to add')
    );
  }

  private removeAllGeofence() {
    this.geofence.removeAll();
  }





}



















