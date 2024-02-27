import { AssistantPlaceOrderComponent } from './../assistant-place-order/assistant-place-order.component';
import { Component, OnInit } from '@angular/core';
import { AssistantInnerCategory } from '../../models/assistant-inner-category.model';
import { SharedlocationService } from '../../shared/service/common/sharedlocation.service';
import { AssistantInnerCategoryService } from '../../service/assistant-inner-category.service';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { ParamsService, Param } from '../../service/params.service';

@Component({
  selector: 'app-assistant-inner-category',
  templateUrl: './assistant-inner-category.component.html',
  styleUrls: ['./assistant-inner-category.component.scss']
})
export class AssistantInnerCategoryComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  assistantInnerCategories: AssistantInnerCategory[] = [];
  selectLocation: number;
  assistantInnerCategoriesSubscription: Subscription;

  constructor(
    private _sharedlocationService: SharedlocationService,
    private assistantInnerCategoryService: AssistantInnerCategoryService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private paramsService: ParamsService
  ) {}

  ngOnInit() {
    this.initializeData();
    this.getLocationSelectedValue();
  }

  initializeData() {
    this.activatedRoute.params.subscribe(params => {
      const { area } = params;

      this.paramsService.getAreaIdByName(area).subscribe((data: Param) => {
        const { Id, Name } = data;
        this.selectLocation = Id;
        this.getAssistantInnerCategories(this.selectLocation);
      });
    });
  }

  getAssistantInnerCategories(areaId: number) {
    this.assistantInnerCategoriesSubscription = this.assistantInnerCategoryService
      .getAssistantInnerCategories(areaId)
      .subscribe((data: AssistantInnerCategory[]) => {
        this.assistantInnerCategories = data;
      });
  }

  getLocationSelectedValue() {
    this._sharedlocationService.locationCast.subscribe(location => {
      this.selectLocation = location.LocationId;

      this.getAssistantInnerCategories(this.selectLocation);
    });
  }

  openModalWithComponent(assistantInnerCategory) {
    const initialState = {
      assistantInnerCategory: assistantInnerCategory
    };
    this.bsModalRef = this.modalService.show(
      AssistantPlaceOrderComponent,
      Object.assign({}, { class: 'custom_modal_wrapper' }, { initialState }, { backdrop: 'static', keyboard: false })
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnDestroy() {
    this.assistantInnerCategoriesSubscription && this.assistantInnerCategoriesSubscription.unsubscribe();
  }
}
