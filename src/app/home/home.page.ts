import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {AlertController, Platform, ModalController} from '@ionic/angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsMapTypeId,
    GoogleMapsAnimation,
    Marker,
    GoogleMapOptions,
    CircleOptions,
    Circle
} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SearchModalPage} from '../search-modal/search-modal.page';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {ToastController} from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { HTTP } from '@ionic-native/http/ngx';

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
    searchEnable = false;
    public offers: any;


    constructor(
        private alertController: AlertController,
        private geolocation: Geolocation,
        private platform: Platform,
        private modal: ModalController,
        public zone: NgZone,
        private localNotifications: LocalNotifications,
        public toastController: ToastController,
        private backgroundMode: BackgroundMode,
        private http: HTTP) {
    }

    async ngOnInit() {
        this.platform.ready().then(() => {
            // this.backgroundMode.enable();
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
                    zoom: 16
                },
                mapType: GoogleMapsMapTypeId.ROADMAP
            };
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

    centerLocation(lat = null, lng = null) {
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
            zoom: 16,
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
                this.marker.setPosition({lat: this.lat, lng: this.lng});
                // this.centerLocation(this.lat, this.lng);
                this.speed = (+position.coords.speed * 3.6) + 'Km/h';
                if (this.circle) {
                    this.addCircle();
                }
                this.search();

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

    addCircle() {
        if (this.circle) {
            this.circle.remove();
        }
        let options: CircleOptions = {
            'center': {'lat': this.lat, 'lng': this.lng},
            'radius': 300,
            'strokeColor': '#98b7e2',
            'strokeWidth': 1,
            'fillColor': '#d5e2ff'
        };

        this.map.addCircle(options).then((circle: Circle) => {
            this.circle = circle;
        });
    }

    presentNotification(message, name, item, price) {
        this.localNotifications.schedule({
            id: 1,
            title: message,
            text: name + ' gives ' + price + ' offer on ' + item,
            foreground: true
        });
    }

    async presentToast(distance) {

        const toast = await this.toastController.create({
            message: distance + 'm',
            duration: 2000
        });
        toast.present();
    }

    calculateDistance(lat2, long2) {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((this.lat - lat2) * p) / 2 + c(lat2 * p) * c((this.lat) * p) * (1 - c(((this.lng - long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        let result = dis * 1000;
        return result;
    }

    async startSearch() {
        if (this.circle) {
            this.circle.remove();
            this.searchEnable = false;
        } else {
            this.addCircle();
            this.searchEnable = true;
            this.search();
        }
    }

    search() {

        this.http.get('https://www.hashnative.com/alloffers', {}, {})
            .then(data => {
                this.offers = JSON.parse(data.data);

                for (var j = 0; j < this.offers.length; j++) {
                    var location = this.offers[j].location;
                    var name = this.offers[j].name;
                    var radius = this.offers[j].radius;
                    var offer_item = this.offers[j].offer_item;
                    var offer_price = this.offers[j].offer_price;

                    if (this.searchEnable === true && this.calculateDistance(location.split(',')[0], location.split(',')[1]) < radius) {
                        this.presentNotification('An offer available near you.', name , offer_item , offer_price);
                        console.log('success');
                    }
                }
            })
            .catch(error => {
                console.log(error.error); // error message as string
            });

       // }

    }


}



