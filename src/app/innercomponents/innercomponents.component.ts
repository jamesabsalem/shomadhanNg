
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/service/category/category.service';
import { AvailabelService } from '../shared/model/availabelService.model';
import { ActivatedRoute } from '@angular/router';
import { InnerServices } from '../shared/model/innerServices.model'
import { MainService } from '../shared/model/mainservice.model'
import { InnterCategoryDetails } from '../shared/model/innerCategoryDetails.mode'

@Component({
    selector: 'app-innercomponents',
    templateUrl: './innercomponents.component.html',
    styleUrls: ['./innercomponents.component.scss'],
    providers: [CategoryService]
})

export class InnerComponentsComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }
}
