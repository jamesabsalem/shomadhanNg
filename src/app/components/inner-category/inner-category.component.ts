import { MainService } from './../../shared/model/mainservice.model';
import { InnerCategoryService } from './../../service/inner-category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InnerCategory } from '../../models/inner-category.model';
import { Subscription, Observable } from 'rxjs';
import { SharedlocationService } from '../../shared/service/common/sharedlocation.service';
import { ActivatedRoute } from '@angular/router';
import { DataStorage } from '../../service/data-storage.service';
import { Router } from '@angular/router';
import { ParamsService, Param } from '../../service/params.service';

@Component({
  selector: 'app-inner-category',
  templateUrl: './inner-category.component.html',
  styleUrls: ['./inner-category.component.scss']
})
export class InnerCategoryComponent implements OnInit, OnDestroy {
  title = '';
  bsModalRef: BsModalRef;
  allInnerCategories: InnerCategory[] = [];
  selectLocation: number;
  selectLocationName: string;
  selectedServiceId: number;
  selectedServiceName: string;

  allInnerCategoriesSubscription: Subscription;

  constructor(
    private _sharedlocationService: SharedlocationService,
    private innerCategoryService: InnerCategoryService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private dataStorage: DataStorage,
    private router: Router,
    private paramsService: ParamsService
  ) {}

  ngOnInit() {
    this.initializeData();
    this.getLocationSelectedValue();
  }

  initializeData() {
    this.activatedRoute.params.subscribe(params => {
      const { area, serviceName } = params;

      const paramIdSubs = Observable.forkJoin([
        this.paramsService.getAreaIdByName(area.toOriginalString()),
        this.paramsService.getServiceIdByName(serviceName.toOriginalString())
      ]);

      paramIdSubs.subscribe(paramArray => {
        const filterdArr = paramArray.filter(x => x);

        if (filterdArr.length === 0 || filterdArr.length < 2) {
          this.title = 'Service not found';
          return;
        }

        const { Id: areaId, Name: _areaName } = paramArray[0] as Param;
        const { Id: serviceId, Name: _selectedServiceName } = paramArray[1] as Param;

        this.selectLocation = areaId;
        this.selectLocationName = _areaName;

        this.selectedServiceId = serviceId;
        this.selectedServiceName = _selectedServiceName;

        this.title = _selectedServiceName;

        this.getAllInnerCategories(this.selectLocation);
      });
    });
  }

  getAllInnerCategories(areaId: number) {
    this.allInnerCategoriesSubscription = this.innerCategoryService
      .getAllInnerCategories({ AreaId: +areaId, ServiceCategoryId: +this.selectedServiceId })
      .subscribe((data: InnerCategory[]) => {
        this.allInnerCategories = data;
      });
  }

  getLocationSelectedValue() {
    this._sharedlocationService.locationCast.subscribe(location => {
      this.selectLocation = location.LocationId;
      this.selectLocationName = location.LocationName;

      this.getAllInnerCategories(this.selectLocation);
    });
  }

  onInnerCategoryClickHandler(innerCategory: InnerCategory) {
    this.router.navigateByUrl(
      `category/${this.selectLocationName.toRouteString()}/${this.selectedServiceName.toRouteString()}/${innerCategory.Name.toRouteString()}`
    );
  }

  ngOnDestroy() {
    this.allInnerCategoriesSubscription && this.allInnerCategoriesSubscription.unsubscribe();
  }
}
