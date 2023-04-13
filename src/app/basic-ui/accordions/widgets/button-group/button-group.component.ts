import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapWidgetCodeEnum } from '../../shared/enums/widgets.enum';
// import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'map-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
  @Output() onAction = new EventEmitter<string>();

  _currentRole: string = "ADMIN";
  _isPermPage: boolean = true;

  constructor() { 
    // this._currentRole = this.authService.getCurrentRole();
  }

  ngOnInit(): void {
    // this.checkIsPermPage();
  }

  // checkIsPermPage(){
  //   this._isPermPage = !this.authService.checkIsPublicPages();
  // }

  openLayerlist() {
    this.onAction.emit(MapWidgetCodeEnum.LAYERLIST);
  }

  openSearchWidget() {
    this.onAction.emit(MapWidgetCodeEnum.SEARCHWIDGET);
  }
}
