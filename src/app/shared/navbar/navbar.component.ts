import { CustomerInfoService } from './../service/common/customer-info.service';

import { NotificationService } from './../service/notification/notification.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { SigninComponent } from '../../signin/signin.component';
import { SelectLocationComponent } from '../../select-location/select-location.component';
import { SignupComponent } from '../../signup/signup.component';
import { SharedlocationService } from '../service/common/sharedlocation.service';
import { VisibleNavbar } from '../model/VisibleNavbar.model';
import { CustomercookiesService } from '../service/common/customercookies.service';
import { SigninHeaderService } from '../service/common/signin-header.service';
import { StoredDataTypes } from '../../service/stored-data-types.enum';
import { CartStorageService } from '../../service/cart-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CartModalComponent } from '../../components/cart-modal/cart-modal.component';
import { HostBinding } from '@angular/core';
// import { Element } from '@angular/compiler';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @HostBinding('class.app_navbar')
  true;

  private toggleButton: any;
  private sidebarVisible: boolean;
  selectLocation: string;
  customerPhoto: string;
  customerName: string;
  notivicationCount: number;
  private notifications: Notification[];
  cartCount = 0;
  bsModalRef: BsModalRef;

  visibleNavbar: VisibleNavbar = {
    isSign: true,
    isSignUp: true,
    isUser: true,
    isCart: true,
    isNotification: true
  };

  constructor(
    public location: Location,
    private element: ElementRef,
    private modalService: NgbModal,
    private _sharedlocationService: SharedlocationService,
    private _router: Router,
    private _customercookiesService: CustomercookiesService,
    private _signinHeaderService: SigninHeaderService,
    private _notificationService: NotificationService,
    private _customerInfoService: CustomerInfoService,
    private cartStorageService: CartStorageService,
    private bsModalService: BsModalService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.checkUserVisibility();
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

    this.getcartCount();
  }
  getNotification(id: number) {
    const userId = {
      UserId: id
    };
    this._notificationService.getNotificationList(userId).subscribe(res => {
      this.notifications = res;
      this.notivicationCount = res.length;
    });
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function() {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  isHome() {
    const titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '/home') {
      return true;
    } else {
      return false;
    }
  }
  isDocumentation() {
    // const titlee = this.location.prepareExternalUrl(this.location.path());
    // if (titlee === '/documentation') {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  scroll(el) {
    el.scrollIntoView();
  }
  btnSignUp() {
    const modalRef = this.modalService.open(SignupComponent);
  }
  btnSignIn(): void {
    this._signinHeaderService.setIsShow(true);
    const modalRef = this.modalService.open(SigninComponent);
  }
  onClickLocation(): void {
    const modalRef = this.modalService.open(SelectLocationComponent);
  }
  onClickLogOut() {
    this._customercookiesService.deleteCustomerCookies();
    this.checkUserVisibility();
    this._router.navigate(['/home']);
  }
  checkUserVisibility() {
    this._customercookiesService.getCustomerCookies();
    this._sharedlocationService.getLocation();
    this._sharedlocationService.locationCast.subscribe(location => (this.selectLocation = location.LocationName));
    this._customercookiesService.customerInfoCast.subscribe(cust => {
      if (cust != null && cust.Status != null) {
        this.visibleNavbar.isSign = false;
        this.visibleNavbar.isSignUp = false;
        this.visibleNavbar.isUser = true;
        this.customerPhoto = cust.Data[0].ProfilePic;
        this.customerName = cust.Data[0].FullName;
        this.getNotification(cust.Data[0].UserId);
      } else {
        this.visibleNavbar.isUser = false;
        this.visibleNavbar.isSign = true;
        this.visibleNavbar.isSignUp = true;
        this.notivicationCount = null;
        this.notifications = null;
      }
    });
  }

  getcartCount() {
    this.cartStorageService.addCartInfo$.subscribe(value => {
      if (value) {
        setTimeout(() => {
          this.cartStorageService.getCartData<any[]>(StoredDataTypes.AllCartInfo).subscribe(data => {
            if (!!data) {
              this.cartCount = data.length;
            }
          });
        }, 100);
      }
    });
  }

  onCartClickHandler() {
    if (this.cartCount > 0) {
      this.bsModalRef = this.bsModalService.show(
        CartModalComponent,
        Object.assign({}, { class: 'custom_modal_wrapper' }, {}, { backdrop: 'static', keyboard: false })
      );
      this.bsModalRef.content.closeBtnName = 'Close';
    }
  }

  // get showHideNavbar() {
  //   const navbar = document.querySelector('.invoice_wrapper').closest('.app_navbar');
  //   //  $(navbar).
  //   // navbar.setAttribute('display', 'none');
  //   return navbar ? true : false;
  // }
}
