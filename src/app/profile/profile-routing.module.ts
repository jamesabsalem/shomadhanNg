import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { ReferEarnComponent } from './refer-earn/refer-earn.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { RouteGuardService } from '../shared/service/common/route-guard.service';

const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: 'my-profile', component: MyProfileComponent, canActivate: [RouteGuardService] },
      { path: 'my-order', component: MyOrderComponent, canActivate: [RouteGuardService] },
      { path: 'my-wallet', component: MyWalletComponent, canActivate: [RouteGuardService] },
      { path: 'refer-earn', component: ReferEarnComponent, canActivate: [RouteGuardService] },
      { path: 'promotions', component: PromotionsComponent, canActivate: [RouteGuardService] },
      { path: '', redirectTo: 'my-profile', pathMatch: 'full', canActivate: [RouteGuardService] },
    ]
  }

];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
