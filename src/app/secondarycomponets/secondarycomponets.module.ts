import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import {NgxPaginationModule} from 'ngx-pagination';

import { NgxCarouselModule } from 'ngx-carousel';

import 'hammerjs';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SecondaryComponentsComponent } from './secondarycomponets.component';


import { SubCategoryComponent } from './subcategory/subcategory.component';
import { CategoryInfoComponent } from './categoryinfo/categoryinfo.component';
// import { CustomerReviewComponent } from './customerreviews/customerreviews.component';
import { HiringPolicyComponent } from './hiringpolicy/hiringpolicy.component';
import { FAQComponent } from './faq/faq.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JWBootstrapSwitchModule,
        NgxCarouselModule,
        HttpModule,
        RouterModule,
        SharedModule,
        NgxPaginationModule,
        NgbTabsetModule.forRoot()
    ],
    declarations: [
        SecondaryComponentsComponent,
        SubCategoryComponent,
        CategoryInfoComponent,
        // CustomerReviewComponent,
        HiringPolicyComponent,
        FAQComponent,
    ],
    entryComponents: [],
    exports: [SecondaryComponentsComponent]
})
export class SecondaryComponentsModule { }


