import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { CategoryComponent } from './category/category.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgxCarouselModule } from 'ngx-carousel';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material'

import 'hammerjs';
import { MainservicesComponent } from './mainservices/mainservices.component';
import { InnerserviceComponent } from './innerservice/innerservice.component';
import { BannerComponent } from './banners/banner.component';
import { HttpModule } from '@angular/http';
import { GetLinkComponent } from './getlink/getlink.component';
import { CustomerFeedbackComponent } from './customerfeedback/customerfeedback.component';
import { LocationComponent } from '../location/location.component';
import { PartnerReviewComponent } from './partner-review/partner-review.component';
import { MainServiceByinnerServicePipe } from '../pipe/main-service-byinner-service.pipe';
import { PartnerComponent } from './partner/partner.component';
import { PromiseComponent } from './Promise/promise.component';
import { PartnerRegistationComponent } from './partner-registation/partner-registation.component';
import { ReadMoreComponent } from '../shared/Directive/read-more.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JWBootstrapSwitchModule,
        NgxCarouselModule,
        HttpModule,
        YoutubePlayerModule,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
    ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        CategoryComponent,
        MainservicesComponent,
        InnerserviceComponent,
        BannerComponent,
        GetLinkComponent,
        CustomerFeedbackComponent,
        NgbdModalComponent,
        LocationComponent,
        PartnerReviewComponent,
        MainServiceByinnerServicePipe,
        PartnerComponent,
        PromiseComponent,
        PartnerRegistationComponent,
        ReadMoreComponent,
    ],
    entryComponents: [
        PartnerRegistationComponent
    ],
    exports: [
        ComponentsComponent,
        MainservicesComponent,
        BannerComponent,
        GetLinkComponent
    ]
})
export class ComponentsModule { }
