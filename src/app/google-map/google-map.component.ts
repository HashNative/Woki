import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('map') mapElement;
  map: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){
    let coord = new google.maps.LatLng(45,100);
    let mapOptions: google.maps.MapOptions={
        center: coord,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement,
      mapOptions)

  }
}
