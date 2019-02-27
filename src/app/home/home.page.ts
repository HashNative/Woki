import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsMapTypeId, GoogleMapsAnimation, Marker, GoogleMapOptions } from '@ionic-native/google-maps'; 
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  map: GoogleMap;

  constructor(
    private alertController: AlertController,
    private geolocation: Geolocation,
    private platform: Platform) { 
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  //loadMap()
  async loadMap() {
    let lat: any;
    let lng: any;
    this.geolocation.getCurrentPosition().then((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: lat,
            lng: lng
          },
          zoom: 18
        },
        mapType: GoogleMapsMapTypeId.ROADMAP
      }
      this.map = GoogleMaps.create('map', mapOptions);
      this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'green',
        animation: GoogleMapsAnimation.BOUNCE,
        position: {
          lat: lat,
          lng: lng
        }
      });
    });
  }
  //loadMap()
  

  //showAlert3()
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
  // showAlert3()

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




