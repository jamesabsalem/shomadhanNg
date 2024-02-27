import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { InnerComponentsComponent } from './innercomponents/innercomponents.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { AssistantInnerCategoryComponent } from './components/assistant-inner-category/assistant-inner-category.component';
import { InnerCategoryComponent } from './components/inner-category/inner-category.component';
import { ExtraOptions } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'inner/:areaId/:serviceId/:innderId', component: InnerComponentsComponent },
  { path: 'category/:area/:serviceName/:innderServiceName', component: InnerComponentsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'partner/:partnerId', component: PartnerProfileComponent },
  { path: 'payment', component: PaymentComponent },
  // { path: '**', component: HomeComponent, pathMatch: 'full' }

  { path: 'my-order/invoice/:orderId', component: InvoiceComponent },
  { path: 'assistant/:area', component: AssistantInnerCategoryComponent },
  { path: 'category/:area/:serviceName', component: InnerCategoryComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
