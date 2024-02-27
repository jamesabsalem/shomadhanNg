import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { MainServiceNavComponent } from '../main-service-nav/main-service-nav.component';
import { FilterByMainService } from '../pipe/filter-by-main-service.pipe';
import { RecomandedServiceComponent } from '../secondarycomponets/recomandedservice/recomandedservice.component';
import { AvailableAreaComponent } from '../secondarycomponets/availableareas/availableareas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecondaryComponentReviewFooterComponent } from '../components/secondary-component-review-footer/secondary-component-review-footer.component';
import { CustomerReviewComponent } from '../secondarycomponets/customerreviews/customerreviews.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MobileVerificationComponent } from '../components/mobile-verification/mobile-verification.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SortByPipe } from '../pipe/sort-by.pipe';



import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './service/common/auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [
    MainServiceNavComponent,
    RecomandedServiceComponent,
    AvailableAreaComponent,
    FilterByMainService,
    SecondaryComponentReviewFooterComponent,
    CustomerReviewComponent,
    MobileVerificationComponent,
    SortByPipe
  ],
  exports: [
    MainServiceNavComponent,
    RecomandedServiceComponent,
    AvailableAreaComponent,
    SecondaryComponentReviewFooterComponent,
    CustomerReviewComponent,
    SortByPipe,
    CustomerReviewComponent,
    MobileVerificationComponent
  ],
  providers: [
    FilterByMainService,
    AuthService
  ],
  entryComponents: [
    MobileVerificationComponent
  ]
})
export class SharedModule { }
