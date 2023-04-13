import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExtendComponent } from './popup-extend.component';

describe('PopupExtendComponent', () => {
  let component: PopupExtendComponent;
  let fixture: ComponentFixture<PopupExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupExtendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
