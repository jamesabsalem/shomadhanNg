import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ProfileComponent } from './profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { ReferEarnComponent } from './refer-earn/refer-earn.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { EmptyOrderComponent } from './my-order/empty-order/empty-order.component';
import { OnGoingOrderComponent } from './my-order/on-going-order/on-going-order.component';
import { OrderDetailsComponent } from './my-order/order-details/order-details.component';
import { AddPromotionsComponent } from './promotions/add-promotions/add-promotions.component';
import { EmptyPromotionsComponent } from './promotions/empty-promotions/empty-promotions.component';
import { RouteGuardService } from '../shared/service/common/route-guard.service';
import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileService} from '../shared/service/profile/profile.service';
import {IsOrderService} from '../shared/service/common/is-order.service';
import {SharedModule} from '../shared/shared.module';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    ProfileRoutingModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ImageCropperModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    ProfileComponent,
    MyProfileComponent,
    MyOrderComponent,
    MyWalletComponent,
    ReferEarnComponent,
    PromotionsComponent,
    EmptyOrderComponent,
    OnGoingOrderComponent,
    OrderDetailsComponent,
    AddPromotionsComponent,
    EmptyPromotionsComponent,
    PhotoUploadComponent,
    ImageCropperComponent,
    EditProfileComponent
  ],
  providers: [
    RouteGuardService,
    ProfileService,
    IsOrderService
  ],
  entryComponents: [
    PhotoUploadComponent,
    EditProfileComponent
  ]
})
export class ProfileModule { }
