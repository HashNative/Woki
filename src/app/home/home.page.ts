import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsMapTypeId, GoogleMapsAnimation, Marker, GoogleMapOptions, CircleOptions, Circle } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SearchModalPage } from '../search-modal/search-modal.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ToastController } from '@ionic/angular';

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
  public restaurant = 'resources/img/restaurant.png';

  constructor(
    private alertController: AlertController,
    private geolocation: Geolocation,
    private platform: Platform,
    private modal: ModalController,
    public zone: NgZone,
    private localNotifications: LocalNotifications,
    public toastController: ToastController) {
  }

  async ngOnInit() {
    this.platform.ready().then(() => {
        this.loadMap();
        this.startTracking();
    });
  }

  // loadMap() {
  //
  //   this.geolocation.getCurrentPosition().then((position) => {
  //     this.lat = position.coords.latitude;
  //     this.lng = position.coords.longitude;
  //     let mapOptions: GoogleMapOptions = {
  //       camera: {
  //         target: {
  //           lat: this.lat,
  //           lng: this.lng
  //         },
  //         zoom: 18
  //       },
  //       mapType: GoogleMapsMapTypeId.ROADMAP
  //     }
  //     this.map = GoogleMaps.create('map', mapOptions);
  //     let marker = this.map.addMarkerSync({
  //       title: 'Ionic',
  //       animation: GoogleMapsAnimation.BOUNCE,
  //       position: {
  //         lat: this.lat,
  //         lng: this.lng
  //       }
  //     });
  //     this.marker.push(marker);
  //   });
  // }
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
      duration: 1500,
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
      'strokeColor' : '#98b7e2',
      'strokeWidth': 1,
      'fillColor' : '#d5e2ff'
    };

    this.map.addCircle(options).then((circle: Circle) => {
      this.circle = circle;
    });
  }


  async presentNotification() {
    this.localNotifications.schedule({
      title: 'Welcome to our shop',
      trigger: {
        type: 'location',
        center: [6.937304, 79.862848],
        radius: 15,
        notifyOnEntry: true
      }
    });


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

}























// async showAlert1() {
//   const alert = await this.alertController.create({
//     header: 'Prompt!',
//     inputs: [
//       {
//         name: 'name1',
//         type: 'text',
//         placeholder: 'Placeholder 1'
//       },
//       {
//         name: 'name2',
//         type: 'text',
//         id: 'name2-id',
//         value: 'hello',
//         placeholder: 'Placeholder 2'
//       },
//       {
//         name: 'name3',
//         value: 'http://ionicframework.com',
//         type: 'url',
//         placeholder: 'Favorite site ever'
//       },
//       // input date with min & max
//       {
//         name: 'name4',
//         type: 'date',
//         min: '2017-03-01',
//         max: '2018-10-12'
//       },
//       // input date without min nor max
//       {
//         name: 'name5',
//         type: 'date'
//       },
//       {
//         name: 'name6',
//         type: 'number',
//         min: -5,
//         max: 10
//       },
//       {
//         name: 'name7',
//         type: 'number'
//       }
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: () => {
//           console.log('Confirm Cancel');
//         }
//       }, {
//         text: 'Ok',
//         handler: () => {
//           console.log('Confirm Ok');
//         }
//       }
//     ]
//   });

//   await alert.present();
// }



// async showAlert2() {
//   const alert = await this.alertController.create({
//     header: 'Confirm!',
//     message: 'Message <strong>text</strong>!!!',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: (blah) => {
//           console.log('Confirm Cancel: blah');
//         }
//       }, {
//         text: 'Okay',
//         handler: () => {
//           console.log('Confirm Okay');
//         }
//       }
//     ]
//   });

//   await alert.present();
// }




