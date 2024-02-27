import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicePartnerService } from '../../service/service-partner.service';
import { ServicePartner } from '../../models/service-partner.model';
import { Input } from '@angular/core';
import { Subject } from 'rxjs';
import { StoredDataTypes } from '../../service/stored-data-types.enum';
import { CartDetailsInfo } from '../../models/mapped-question';
import { ScheduleInfo } from '../../models/schedule-time';
import { CartStorageService } from '../../service/cart-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-partner',
  templateUrl: './service-partner.component.html',
  styleUrls: ['./service-partner.component.scss'],
  providers: [NgbRatingConfig]
})
export class ServicePartnerComponent implements OnInit {
  @Input()
  servicePartnerData$: Subject<ServicePartner>;
  @Input()
  scheduleInfo: ScheduleInfo;

  servicePartnerParams = {
    // AreaId: 1,
    // SubCategoryId: 1,
    // SubCategoryOptionIdList: [1, 2, 3],
    // ScheduleTimeId: 1,
    // ServiceCategoryId: 3,
    // SubOptionDetailId: 1,
    // ScheduleDayId: 1,
    // InnerCategoryId: 1
  };

  public servicePartners: Array<ServicePartner> = [];
  public selectedPartnerId = -1;
  public selectedPartner: ServicePartner;

  constructor(
    config: NgbRatingConfig,
    private servicePartnerService: ServicePartnerService,
    private cartStorageService: CartStorageService,
    private _router: Router
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    // cartDetailsInfo: CartDetailsInfo
    const cartSubs = this.cartStorageService
      .getCartData<CartDetailsInfo>(StoredDataTypes.CurrentProcessingCart)
      .subscribe(data => {
        if (!!data) {
          const cartDetailsInfo: CartDetailsInfo = data;

          const _subCategoryOptionIdList = cartDetailsInfo.CartOrderData.ServiceOptionList.map(
            x => x.SubcategoryOptionId
          );

          this.servicePartnerParams = {
            AreaId: cartDetailsInfo.ServiceSelectionData.AreaId,
            SubCategoryId: cartDetailsInfo.SubCategroy.SubCategoryId,
            ServiceCategoryId: cartDetailsInfo.SubCategroy.ServiceCategoryId,
            InnerCategoryId: cartDetailsInfo.SubCategroy.InnerCategoryId,
            ScheduleTimeId: this.scheduleInfo.ScheduleTime.ServiceScheduleTimeId,
            SubCategoryOptionIdList: _subCategoryOptionIdList,
            SubOptionDetailId: 0, // Need to talk
            ScheduleDayId: 0 // Need to talk
          };

          this.getAllServicePartners();
        }
      });
  }

  // partnerLink(partnerId: number) {
  //   this._router.navigateByUrl('partner/' + partnerId);
  // }
  partnerLink(partnerId: number) {
    return `/partner/${partnerId}`;
  }

  getAllServicePartners(): void {
    this.servicePartnerService.getAllServicePartners(this.servicePartnerParams).subscribe((data: [ServicePartner]) => {
      this.servicePartners = data;
    });
  }

  onChosePartnerHandler(servicePartner) {
    const { ServicePartnerId } = servicePartner;
    this.selectedPartner = servicePartner;
    this.selectedPartnerId = +ServicePartnerId;

    this.servicePartnerData$.next(servicePartner);
  }

  //  for test

  // saveImages(orderId: string, cartDetailsInfo: CartDetailsInfo) {
  //   const files = cartDetailsInfo.CartOrderData.ServiceOptionList.reduce((prev, cur, index) => {
  //     if (!!cur && cur.Files) {
  //       prev = [...prev, ...cur.Files];
  //     }
  //     return prev;
  //   }, []);

  //   const _pFiles = [];
  //   files.forEach((x, index) => {
  //     const formData = new FormData();
  //     formData.append('Img' + (index + 1), x.file, x.file.name);
  //     const ob = {};
  //     ob['Img' + (index + 1)] = formData;
  //     _pFiles.push(ob);
  //   });
  // }
}
