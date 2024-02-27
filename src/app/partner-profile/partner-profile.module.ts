
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxCarouselModule} from 'ngx-carousel';
import {FormsModule} from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { PartnerProfileRoutingModule } from './partner-profile-routing.module';
import { PartnerProfileComponent } from './partner-profile.component';
import { PartnerReviewsComponent } from './partner-reviews/partner-reviews.component';
import { SharedModule } from './../shared/shared.module';
import { PartnerInfoComponent } from './partner-info/partner-info.component';
import { PartnerPhotoVideoComponent } from './partner-photo-video/partner-photo-video.component';
import { PartnerService } from './../shared/service/partner/partner.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxCarouselModule,
    FormsModule,
    NgbRatingModule
  ],
  declarations: [
    PartnerProfileComponent,
    PartnerReviewsComponent,
    PartnerInfoComponent,
    PartnerPhotoVideoComponent
  ],
  providers: [
    PartnerService
  ]
})
export class PartnerProfileModule { }
