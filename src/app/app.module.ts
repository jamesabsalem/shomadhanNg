import { CartService } from './service/cart.service';

import { SubCategoryOptionComponent } from './components/sub-category-option/sub-category-option.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ScrollSpyModule } from 'ngx-scrollspy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { TabModule } from 'angular-tabs-component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from './home/home.module';
import { InnerComponentsModule } from './innercomponents/innercomponents.module';
import { SigninComponent } from './signin/signin.component';
import { SharedlocationService } from './shared/service/common/sharedlocation.service';
import { SubCategoryService } from './service/sub-category.service';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectLocationComponent } from './select-location/select-location.component';
import { SubCategoryModalComponent } from './components/sub-category-modal/sub-category-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { CustomercookiesService } from './shared/service/common/customercookies.service';
import { CustomerSocialService } from './shared/service/common/customer-social.service';
import { SubCategoryQuestionComponent } from './components/sub-category-question/sub-category-question.component'
import { ProfileModule } from './profile/profile.module';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { FinalStepFaqComponent } from './components/final-step-faq/final-step-faq.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NgxCarouselModule } from 'ngx-carousel';
import { NguCarouselModule } from '@ngu/carousel';
import { ScheduleService } from './service/schedule.service';
import { OrderPlacementComponent } from './components/order-placement/order-placement.component';
import { ServicePartnerComponent } from './components/service-partner/service-partner.component';
import { DeliveryDetailsComponent } from './components/delivery-details/delivery-details.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ServicePartnerService } from './service/service-partner.service';
import { OrderConfirmPopupComponent } from './components/order-confirm-popup/order-confirm-popup.component';
import { PartnerProfileModule } from './partner-profile/partner-profile.module';
import { SigninHeaderService } from './shared/service/common/signin-header.service';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { CartStorageService } from './service/cart-storage.service';
import { LocalStorageService } from './service/local-storage.service';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { CartListItemComponent } from './components/cart-list-item/cart-list-item.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AddressWithLogoComponent } from './components/address-with-logo/address-with-logo.component';
import { InvoiceFooterComponent } from './components/invoice-footer/invoice-footer.component';
import { InvoiceOrderListComponent } from './components/invoice-order-list/invoice-order-list.component';
import { InvoiceService } from './service/invoice.service';
import { PaymentModule } from './payment/payment.module';
import { AssistantInnerCategoryComponent } from './components/assistant-inner-category/assistant-inner-category.component';
import { AssistantPlaceOrderComponent } from './components/assistant-place-order/assistant-place-order.component';
import { AssistantInnerCategoryService } from './service/assistant-inner-category.service';
import { AssistantOrderSummaryComponent } from './components/assistant-order-summary/assistant-order-summary.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { MobileVerificationComponent } from './components/mobile-verification/mobile-verification.component';
import { InnerCategoryService } from './service/inner-category.service';
import { InnerCategoryComponent } from './components/inner-category/inner-category.component';
import { DataStorage } from './service/data-storage.service';
import { ParamsService } from './service/params.service';
// import { CustomerReviewComponent } from './secondarycomponets/customerreviews/customerreviews.component';
// import { SecondaryComponentReviewFooterComponent } from './components/secondary-component-review-footer/secondary-component-review-footer.component';
import '@extensions/string';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SelectLocationComponent,
    SubCategoryModalComponent,
    SubCategoryOptionComponent,
    SubCategoryQuestionComponent,
    PhotoUploadComponent,
    FinalStepFaqComponent,
    ScheduleComponent,
    OrderPlacementComponent,
    ServicePartnerComponent,
    DeliveryDetailsComponent,
    OrderSummaryComponent,
    OrderConfirmPopupComponent,
    CartModalComponent,
    CartListItemComponent,
    InvoiceComponent,
    AddressWithLogoComponent,
    InvoiceFooterComponent,
    InvoiceOrderListComponent,
    AssistantInnerCategoryComponent,
    AssistantPlaceOrderComponent,
    AssistantOrderSummaryComponent,
    InnerCategoryComponent
    // SecondaryComponentReviewFooterComponent
    // CustomerReviewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SharedModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HomeModule,
    ScrollSpyModule.forRoot(),
    InnerComponentsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    //  AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    ProfileModule,
    PartnerProfileModule,
    NgxCarouselModule,
    NguCarouselModule,
    ReactiveFormsModule,
    ForgetPasswordModule,
    NgxPageScrollModule,
    PaymentModule,
    TabModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  entryComponents: [
    SigninComponent,
    SelectLocationComponent,
    SubCategoryModalComponent,
    SubCategoryOptionComponent,
    SignupComponent,
    OrderConfirmPopupComponent,
    CartModalComponent,
    AssistantPlaceOrderComponent,
    // MobileVerificationComponent
  ],
  providers: [
    SharedlocationService,
    HttpService,
    SubCategoryService,
    CookieService,
    CustomercookiesService,
    CustomerSocialService,
    ScheduleService,
    ServicePartnerService,
    NgbActiveModal,
    SigninHeaderService,
    CartService,
    CartStorageService,
    LocalStorageService,
    InvoiceService,
    AssistantInnerCategoryService,
    InnerCategoryService,
    DataStorage,
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
    ParamsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
