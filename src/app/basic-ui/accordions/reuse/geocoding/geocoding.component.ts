import { Component, OnInit } from '@angular/core';
import { GeocodingModel } from 'src/app/core/services/map/ol/model/map-api.model';

@Component({
  selector: 'map-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss']
})
export class GeocodingComponent implements OnInit {
  address: string = "";
  coordinate: string = "";
  isShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  open(data: GeocodingModel, coordinate: number[]) {
    this.address = "";
    this.coordinate = "";
    this.isShow = true;
    // if (data.name) this.address = `${data.name}, ${data.district ? data.district.name : ""}, ${data.province ? data.province.name : ""}`;
    this.address = "Tọa độ là: "
    this.coordinate = coordinate.join(', ');
  }

  close() {
    this.isShow = false;
  }
}
