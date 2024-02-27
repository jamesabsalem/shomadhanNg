import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomercookiesService } from '../../shared/service/common/customercookies.service';
import { CustomerInfo } from './../../shared/model/customer.model';
import { Subject } from 'rxjs';
import { ScheduleInfo } from '../../models/schedule-time';
import { ServicePartner } from '../../models/service-partner.model';
import { DeliveryInfo, PlaceOrder, UserDetail, ServiceOptionList } from '../../models/place-order.model';
import { CartService } from '../../service/cart.service';
import { StoredDataTypes } from '../../service/stored-data-types.enum';
import { CartDetailsInfo } from '../../models/mapped-question';
import { CartStorageService } from '../../service/cart-storage.service';

@Component({
  selector: 'app-order-placement',
  templateUrl: './order-placement.component.html',
  styleUrls: ['./order-placement.component.scss']
})
export class OrderPlacementComponent implements OnInit {
  @ViewChild('orderSummary')
  orderSummary;

  readonly SERVICE_TYPE_ID = 2; // instant -> 1; schedule -> 2

  scheduleSelectionData$: Subject<ScheduleInfo> = new Subject<ScheduleInfo>();
  servicePartnerData$: Subject<ServicePartner> = new Subject<ServicePartner>();
  deliveryDetailsData$: Subject<DeliveryInfo> = new Subject<DeliveryInfo>();
  scheduleInfo: ScheduleInfo = new ScheduleInfo();
  servicePartnerInfo: ServicePartner = new ServicePartner();
  deliveryInfo: DeliveryInfo = new DeliveryInfo();

  title = 'Schedule your service';
  isShowSchedule = false;
  isShowServicePartner = false;
  isShowDeliveryDetails = false;
  isShowOrderSummary = false;
  isShowSignin = false;

  nextButtonText = 'NEXT';

  currentStep = 1;
  constructor(
    public bsModalRef: BsModalRef,
    private customercookiesService: CustomercookiesService,
    private cartStorageService: CartStorageService,
    private cartService: CartService,
    // private modalService: BsModalService
  ) {
    this.scheduleSelectionData$.subscribe((scheduleInfo: ScheduleInfo) => {
      this.scheduleInfo = scheduleInfo;
    });

    this.servicePartnerData$.subscribe((servicePartner: ServicePartner) => {
      this.servicePartnerInfo = servicePartner;
    });

    this.deliveryDetailsData$.subscribe((tempUserDeliveryInfo: DeliveryInfo) => {
      this.deliveryInfo = tempUserDeliveryInfo;
    });
  }

  ngOnInit() {
    this.nextButtonText = 'NEXT';
    this.showTitle();
    this.showLoginScreen();
  }

  onOrderPlacementNextHandler() {
    if (this.currentStep === 1 && this.isShowSchedule) {
      if (
        this.scheduleInfo.ScheduleTime === null ||
        this.scheduleInfo.ScheduleTime === undefined ||
        this.scheduleInfo.ScheduleDate === null ||
        this.scheduleInfo.ScheduleDate === undefined
      ) {
        alert('Please select schedule date/time');
        return;
      }

      this.currentStep = 2;
      this.isShowServicePartner = true;
      this.isShowSchedule = false;
    } else if (this.currentStep === 2 && this.isShowServicePartner) {
      if (
        this.servicePartnerInfo &&
        (this.servicePartnerInfo.ServicePartnerId === undefined || this.servicePartnerInfo.ServicePartnerId < 0)
      ) {
        alert('Please select service partner');
        return;
      }

      this.currentStep = 3;
      this.isShowDeliveryDetails = true;
      this.isShowServicePartner = false;
    } else if (this.currentStep === 3 && this.isShowDeliveryDetails) {
      this.currentStep = 4;
      this.isShowOrderSummary = true;
      this.isShowDeliveryDetails = false;
    } else if (this.currentStep === 4 && this.isShowOrderSummary) {
      this.currentStep = 4;
      // this.isShowOrderSummary = true;
      // this.isShowDeliveryDetails = false;
      this.orderSummary.openModalWithComponent();
    }

    this.showTitle();
  }

  showTitle() {
    if (this.isShowSchedule) {
      this.title = 'Schedule your service';
    } else if (this.isShowServicePartner) {
      this.title = 'Available Service Partners';
    } else if (this.isShowDeliveryDetails) {
      this.title = 'Delivery Details';
    } else if (this.isShowOrderSummary) {
      this.title = 'Order Summary';
      this.nextButtonText = 'Checkout';
    }
  }

  showLoginScreen() {
    this.customercookiesService.customerInfoCast.subscribe((data: CustomerInfo) => {
      const { Status } = data;

      if (!!Status) {
        this.isShowSchedule = true;
        this.isShowSignin = false;
      } else {
        this.isShowSignin = true;
        this.isShowSchedule = false;
      }
    });
  }

  onCheckoutClickHandler() {
    // const cartDetailsInfo: CartDetailsInfo = this.cartStorageService.getCartData(StoredDataTypes.CurrentProcessingCart);

    // this.cartService.checkoutCart(this.preparePlaceOrderData(cartDetailsInfo)).subscribe(
    //   data => {
    //     console.log('TCL: OrderPlacementComponent -> onCheckoutClickHandler -> data', data);
    //     this.removeCartItemFromCookie(cartDetailsInfo);

    //     this.currentStep = 4;
    //     this.orderSummary.openModalWithComponent();
    //   },
    //   error => {
    //     console.log('TCL: OrderPlacementComponent -> onCheckoutClickHandler -> error', error);
    //   }
    // );

    const subCheckout = this.cartStorageService
      .getCartData<CartDetailsInfo>(StoredDataTypes.CurrentProcessingCart)
      .subscribe(data => {
        const cartDetailsInfo: CartDetailsInfo = data;
        this.cartService.checkoutCart(this.preparePlaceOrderData(cartDetailsInfo)).subscribe(
          result => {
            console.log('TCL: OrderPlacementComponent -> onCheckoutClickHandler -> result', result);

            // this.removeCartItemFromCookie(cartDetailsInfo);

            // this.currentStep = 4;
            // this.orderSummary.openModalWithComponent();

            const { Status, ResponseMsg } = result;
            if (+Status === 1) {
              // this.getConvertedImages(ResponseMsg, cartDetailsInfo).subscribe(() => {
              //   this.removeCartItemFromCookie(cartDetailsInfo);

              //   this.currentStep = 4;
              //   this.orderSummary.openModalWithComponent();
              // });
              const _convertedFiles = this.getConvertedImages(ResponseMsg, cartDetailsInfo);
              if (_convertedFiles && _convertedFiles.length > 0) {
                this.cartService.saveImages({ OrderId: ResponseMsg, _convertedFiles }).subscribe(res => {
                  console.log('TCL: OrderPlacementComponent -> onCheckoutClickHandler -> res', res);
                  this.removeCartItemFromCookie(cartDetailsInfo);

                  this.currentStep = 4;
                  this.orderSummary.openModalWithComponent();
                });
              } else {
                this.removeCartItemFromCookie(cartDetailsInfo);
                this.currentStep = 4;
                this.orderSummary.openModalWithComponent();
              }
            }
          },
          error => {
            console.log('TCL: OrderPlacementComponent -> onCheckoutClickHandler -> error', error);
          }
        );
      });
  }

  preparePlaceOrderData(cartDetailsInfo: CartDetailsInfo): PlaceOrder {
    const placeOrder: PlaceOrder = new PlaceOrder();
    // const cartDetailsInfo: CartDetailsInfo = this.cartCookieService.getCartData(StoredDataTypes.CurrentProcessingCart);

    const customerInfo = this.customercookiesService.getCustomerInfo();

    if (cartDetailsInfo === null || cartDetailsInfo === undefined) {
      return;
    }

    if (!!cartDetailsInfo) {
      cartDetailsInfo.CartOrderData.ScheduleDate = this.scheduleInfo.ScheduleDate;
      placeOrder.CartOrderData = cartDetailsInfo.CartOrderData;
      placeOrder.CompanyId = this.servicePartnerInfo.CompanyId;
      placeOrder.CompanyName = this.servicePartnerInfo.Name;
      placeOrder.ModelScheduleTime = this.scheduleInfo.ScheduleTime;
      placeOrder.ScheduleDate = this.scheduleInfo.ScheduleDate;
      placeOrder.ServiceTypeId = this.SERVICE_TYPE_ID;
      placeOrder.TempUserDeliveryInfo = this.deliveryInfo;
      placeOrder.UserDetail = customerInfo as UserDetail;
    }

    return placeOrder;
  }

  removeCartItemFromCookie(cartDetailsInfo: CartDetailsInfo) {
    this.cartStorageService.getCartData<CartDetailsInfo[]>(StoredDataTypes.AllCartInfo).subscribe(data => {
      if (!!data) {
        const allCartItems = data;
        const filteredItems = allCartItems.filter(x => x.Id !== cartDetailsInfo.Id);
        this.cartStorageService.storeCartData(StoredDataTypes.AllCartInfo, filteredItems).subscribe(() => {
          this.cartStorageService.sendAddCartNotification();
        });
      }
    });
  }

  getConvertedImages(orderId: string, cartDetailsInfo: CartDetailsInfo) {
    const files = cartDetailsInfo.CartOrderData.ServiceOptionList.reduce((prev, cur, index) => {
      if (!!cur && cur.Files) {
        prev = [...prev, ...cur.Files];
      }
      return prev;
    }, []);

    const _convertedFiles = [];
    files.forEach((x, index) => {
      const formData = new FormData();
      formData.append('Img' + (index + 1), x.file, x.file.name);
      const ob = {};
      ob['Img' + (index + 1)] = formData;
      _convertedFiles.push(ob);
    });

    // if (_convertedFiles && _convertedFiles.length > 0) {
    //  return this.cartService.saveImages({ OrderId: orderId, _convertedFiles });
    // }

    return _convertedFiles;
  }
}
