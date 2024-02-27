import { CategoryService } from './../../shared/service/category/category.service';
import swal from 'sweetalert';
import { PartnerService } from './../../shared/service/partner/partner.service';
import { PartnerRegistation } from './../../shared/model/partner-registation.model';
import { Component, OnInit, NgModule } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '../../shared/service/Home/home.service';
import { Area } from '../../shared/model/area.model';
import { InnerServices } from '../../shared/model/innerServices.model';
import { MainService } from '../../shared/model/mainservice.model';
import { InnterCategoryDetails } from '../../shared/model/innerCategoryDetails.mode';
@Component({
  selector: 'app-partner-registation',
  templateUrl: './partner-registation.component.html',
  styleUrls: ['./partner-registation.component.scss'],
  providers: [HomeService, CategoryService]
})
export class PartnerRegistationComponent implements OnInit {
  public areas: Area[];
  public innerService: InnerServices;
  public innerCategory: MainService[];
  public innerCategoryDetails: InnterCategoryDetails[];
  partner: PartnerRegistation = {
    FullName: null,
    Mobile: null,
    AreaId: null,
    InnerCategoryId: null
  }
  constructor(
    private _ngbActiveModal: NgbActiveModal,
    private _home: HomeService,
    private _partnerService: PartnerService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this._home.getAvailableLocations().then(
      res => { // Success
        this.areas = this._home.areas;
      }
    );
    this.getInnderCategory()
  }
  getInnderCategory() {
    this.categoryService.getInnerServices(1).then(
      res => { // Success
        this.innerService = this.categoryService.innerService;
        this.innerCategory = this.innerService.InnerCategoryInitials;
        this.innerCategoryDetails = this.innerService.InnerCategoryDetails;
      }
    );
  }
  onClickClose() {
    this._ngbActiveModal.close('close modal');
  }
  onClickSubmit(part: PartnerRegistation) {
    this._partnerService.partnerRegistation(part).subscribe(res => {
      if (res.Status === 'success') {
        swal({
          icon: 'success',
          title: res.ResponseMsg
        })
        this._ngbActiveModal.close('close modal');
      } else {
        swal({
          icon: 'error',
          title: res.ResponseMsg
        })
      }
    })
  }
}
