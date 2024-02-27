import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { InnerComponentsComponent } from './innercomponents.component';
import { ScrollSpyModule } from 'ngx-scrollspy';
import { SecondaryComponentsModule } from '../secondarycomponets/secondarycomponets.module';
import { AppRoutingModule } from '../app.routing';
import { FilterByMainService } from '../pipe/filter-by-main-service.pipe';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        ScrollSpyModule  ,
        SecondaryComponentsModule ,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [ InnerComponentsComponent],
    exports: [ InnerComponentsComponent ],
    providers: []
})

export class InnerComponentsModule { }
