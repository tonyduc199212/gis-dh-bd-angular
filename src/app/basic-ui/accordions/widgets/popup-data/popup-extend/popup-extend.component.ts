import { Component, OnInit, Input } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PopupConfig } from 'src/reuse/shared/config/popup.config';
// import { MapApiService } from 'src/app/core/services/map/ol/map-api.service';
import { slideLeft } from 'src/app/core/animations/animations';

@Component({
  selector: 'map-popup-extend',
  templateUrl: './popup-extend.component.html',
  styleUrls: ['./popup-extend.component.scss'],
  animations: [
    slideLeft
  ]
})
export class PopupExtendComponent implements OnInit {
  /*************************************
   **Component hiển thị giao diện*******
   **popup mở rộng cho các lớp dữ liệu**
   *************************************/ 
  @Input() position:string;

  title: string = "";
  showingData: any = [];
  page: number = 1;
  pageSize: number = 5;
  isHiddenPopup: boolean = true;
  scrollbarConfig: PerfectScrollbarConfigInterface = {};
  isShowingTime: boolean = false;

  _popupPosition: string = "md";

  constructor() { 
  }

  ngOnInit(): void {
    if (!PopupConfig.position.includes(this.position)) this.position = 'top-left';
  }


  open(title:string, postion: string, data: any) {
    this.page = 1;
    this._popupPosition = postion;
    this.title = title;
    this.showingData = data;
    this.isShowingTime = false;
    this.isHiddenPopup = false;
  }

  openByUrl(title:string, tableCode: string, layerCode: string) {
    this.page = 1;
    this.title = title;
    // this.mapApiService.subtableGetList(tableCode, layerCode, "").subscribe(rs => {
    //   let result = rs as ApiReturnModel;
    //   this.showingData = result.data;
    //   if (this.showingData[0]) {
    //     if (this.showingData[0].incidentDate) this.isShowingTime = true;
    //     else this.isShowingTime = false;
    //   } else {
    //     this.isShowingTime = false;
    //   }
    // })
    // this.showingData = data;
    this.isHiddenPopup = false;
  }

  close(){
    this.isHiddenPopup = true;
  }

  formatDate(data: any){
    let date;
    if (data.incidentDate) { 
      date = data.incidentDate
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    } else {
      return "";
    }
  }

  checkShowingTime(){
    if (this.showingData[0].incidentDate) return true;
    else return false;
  }

  changePage($event){
    this.page = $event;
  }

}
