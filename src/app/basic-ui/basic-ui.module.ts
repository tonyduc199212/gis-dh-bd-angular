import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonGroupComponent } from './accordions/widgets/button-group/button-group.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { LayerlistComponent } from './accordions/widgets/layerlist/layerlist.component';
import { ToastrService } from 'ngx-toastr';
import { TooltipDirective } from '../shared/directives/tooltip.directive';
import { GeocodingComponent } from './accordions/reuse/geocoding/geocoding.component';
import { PopupDataComponent } from './accordions/widgets/popup-data/popup-data.component';
import { PopupExtendComponent } from './accordions/widgets/popup-data/popup-extend/popup-extend.component';
const routes: Routes = [
  { path: 'accordions', component: AccordionsComponent },
 
];

@NgModule({
  declarations: [
    AccordionsComponent,
    ButtonGroupComponent,
    LayerlistComponent,
    TooltipDirective,
    GeocodingComponent,
    PopupDataComponent,
    PopupExtendComponent
  ],
  imports: [
    // LayerlistComponent,
    // TooltipDirective,
    CommonModule,
    NgbModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    GeocodingComponent,
    PopupDataComponent
  ]
})
export class BasicUiModule { }
