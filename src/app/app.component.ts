import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
// import { version } from 'punycode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  @ViewChild(NavbarComponent)
  navbar: NavbarComponent;

  // tslint:disable-next-line:max-line-length
  constructor(
    private renderer: Renderer,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef,
    public location: Location
  ) {}
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (window.outerWidth > 991) {
          window.document.children[0].scrollTop = 0;
        } else {
          window.document.activeElement.scrollTop = 0;
        }
        this.navbar.sidebarClose();
      });
    this.renderer.listenGlobal('window', 'scroll', event => {
      const number = window.scrollY;
      if (number > 150 || window.pageYOffset > 150) {
        // add logic
        navbar.classList.remove('navbar-static-top');
      } else {
        // remove logic
        navbar.classList.add('navbar-static-top');
      }
    });
    const ua = window.navigator.userAgent;
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
    }
    // if (version) {
    //     const body = document.getElementsByTagName('body')[0];
    //     body.classList.add('ie-background');

    // }
  }
  removeFooter() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (titlee === 'signup' || titlee === 'nucleoicons') {
      return false;
    }
    // tslint:disable-next-line:one-line
    else {
      return true;
    }
  }

  removeHeader() {
    const invoicePath = this.location.prepareExternalUrl(this.location.path());
    if (invoicePath.includes('/my-order/invoice')) {
      return true;
    } else {
      return false;
    }
  }

  removeMainServiceNav() {
    const homePath = this.location.prepareExternalUrl(this.location.path());
    if (homePath === '/home' || homePath === '/') {
      return true;
    } else {
      return false;
    }
  }
}
