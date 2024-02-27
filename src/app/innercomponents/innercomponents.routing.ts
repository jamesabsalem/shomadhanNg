import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerComponentsComponent } from './innercomponents.component';


const innercomponentsRoutes: Routes = [
  { path: 'inner/:sid/:id', component: InnerComponentsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(innercomponentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InnerComponentRoutingModule { }
