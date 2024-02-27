import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../../shared/service/Home/home.service';
import { SharedlocationService } from './../../shared/service/common/sharedlocation.service';
import { CategoryService } from '../../shared/service/category/category.service';
import { MainService } from '../../shared/model/mainservice.model';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryService } from '../../service/sub-category.service';
import { SubCategory } from '../../models/sub-category.model';
import { SubCategoryModalComponent } from '../../components/sub-category-modal/sub-category-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { InnerServices } from '../../shared/model/innerServices.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ParamsService, Param } from '../../service/params.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
  providers: [HomeService]
})
export class SubCategoryComponent implements OnInit {
  bsModalRef: BsModalRef;
  public innerService: string;
  public itemImage: MainService[];

  subCategoryCaption = '';
  allSubcategories: SubCategory[];

  // Service data with areaid, service categoryid, inner categoryid;
  serviceData = {};

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoryService,
    private modalService: BsModalService,
    private _sharedlocationService: SharedlocationService,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private paramsService: ParamsService
  ) {}

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.activatedRoute.params.subscribe(params => {
      const { area, serviceName, innderServiceName } = params;

      const paramIdSubs = Observable.forkJoin([
        this.paramsService.getAreaIdByName(area.toOriginalString()),
        this.paramsService.getServiceIdByName(serviceName.toOriginalString()),
        this.paramsService.getInnerIdByName(innderServiceName.toOriginalString())
      ]);

      paramIdSubs.subscribe(paramArray => {
        const filterdArr = paramArray.filter(x => x);

        if (filterdArr.length === 0 || filterdArr.length < 3) {
          return;
        }

        const { Id: areaId, Name: _areaName } = paramArray[0] as Param;
        const { Id: serviceId, Name: _selectedServiceName } = paramArray[1] as Param;
        const { Id: innderId, Name: _selectedInnerServiceName } = paramArray[2] as Param;

        this.serviceData = {
          AreaId: areaId,
          ServiceCategoryId: serviceId,
          InnerCategoryId: innderId
        };
        this.getSubCategoryCaption(areaId, innderId);
        this.getAllSubCategories(areaId, serviceId, innderId);
      });
    });
  }

  getSubCategoryCaption(areaId: number, innerId: number): void {
    this.categoryService.getInnerServices(+areaId).then((x: any) => {
      const innerCategory = this.categoryService.innerService.InnerCategoryDetails.find(
        y => y.InnerCategoryId === +innerId
      );
      !!innerCategory && (this.subCategoryCaption = innerCategory.Name);
    });
  }

  getAllSubCategories(areaId: number, serviceId: number, innserId: number) {
    const subCatergoryParams = {
      AreaId: areaId,
      ServiceCategoryId: serviceId,
      InnerCategoryId: innserId
    };
    this.subCategoryService.getAllSubCategories(subCatergoryParams).subscribe(data => {
      this.allSubcategories = data;
    });
  }

  openModalWithComponent(subCategory) {
    const initialState = {
      subCategory: subCategory,
      serviceData: this.serviceData
    };
    this.bsModalRef = this.modalService.show(
      SubCategoryModalComponent,
      Object.assign({}, { class: 'custom_modal_wrapper' }, { initialState }, { backdrop: 'static', keyboard: false })
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
