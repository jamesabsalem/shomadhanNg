import { SharedlocationService } from './../shared/service/common/sharedlocation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InnerServices } from '../shared/model/innerServices.model';
import { MainService } from '../shared/model/mainservice.model';
import { InnterCategoryDetails } from '../shared/model/innerCategoryDetails.mode';
import { CategoryService } from '../shared/service/category/category.service';
import { AvailableLocation } from '../shared/model/availableLocation.model';

@Component({
  selector: 'app-main-service-nav',
  templateUrl: './main-service-nav.component.html',
  styleUrls: ['./main-service-nav.component.scss'],
  providers: [CategoryService]
})
export class MainServiceNavComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };
  public itemImage: InnterCategoryDetails[];
  areaId: number;
  areaName: string;
  public innerService: InnerServices;
  public innerCategory: MainService[];
  public innerCategoryDetails: InnterCategoryDetails[];
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private _sharedlocationService: SharedlocationService
  ) {}

  ngOnInit() {
    // const userId = this.activatedRoute.params.subscribe(params => {
    //   this.getInnder(params.areaId)
    //   this.areaId = params.areaId
    // }
    // );

    this._sharedlocationService.locationCast.subscribe((res: AvailableLocation) => {
      this.areaId = res.LocationId;
      this.areaName = res.LocationName;
      this.getInnder(res.LocationId);
    });
  }
  getInnder(areaId: number) {
    this.categoryService.getNavInnerServices(areaId).then(res => {
      // Success
      this.innerService = this.categoryService.innerService;
      this.innerCategory = this.innerService.InnerCategoryInitials.filter(x => !x.IsAssistant);
      this.innerCategoryDetails = this.innerService.InnerCategoryDetails;
    });
  }
}
