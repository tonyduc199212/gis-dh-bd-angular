import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PubSubService {

  constructor() { }

  //sidebar click button
  public onSidebarClickSubject = new Subject<void>();
  onSidebarClickSubjectEvent = this.onSidebarClickSubject.asObservable();

  onSidebarClick(){
    this.onSidebarClickSubject.next();
  }

  //onChange avatar 
  public onChangeAvatarSubject = new Subject<void>();
  onChangeAvatarSubjectEvent = this.onChangeAvatarSubject.asObservable();

  onChangeAvatar(){
    this.onChangeAvatarSubject.next();
  }

  //sidebar onCollapsed button
  public onCollapsedSidebarSubject = new Subject<boolean>();
  onCollapsedSidebarSubjectEvent = this.onCollapsedSidebarSubject.asObservable();

  onCollapsedSidebar(){
    this.onCollapsedSidebarSubject.next();
  }

  //popup data onClosed
  public onClosedPopupDataSubject = new Subject<boolean>();
  onClosedPopupDataSubjectEvent = this.onClosedPopupDataSubject.asObservable();

  onClosedPopupData(){
    this.onClosedPopupDataSubject.next();
  }

  //search widget onSelect
  public onSelectLayerSubject = new Subject<object>();
  onSelectLayerSubjectEvent = this.onSelectLayerSubject.asObservable();

  onSelectLayerPub(data: object){
    this.onSelectLayerSubject.next(data);
  }

  //auto form selectbox onSelect
  public onSelectSelectboxSubject = new Subject<object>();
  onSelectSelectboxSubjectEvent = this.onSelectSelectboxSubject.asObservable();

  onSelectSelectboxPub(data: object){
    this.onSelectSelectboxSubject.next(data);
  }

  //link table map onFillingCoordinates
  public onFillingCoordinatesSubject = new Subject<object>();
  onFillingCoordinatesSubjectEvent = this.onFillingCoordinatesSubject.asObservable();

  onFillingCoordinates(data: object){
    this.onFillingCoordinatesSubject.next(data);
  }
}
