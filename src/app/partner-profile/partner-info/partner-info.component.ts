import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

import { PartnerService } from './../../shared/service/partner/partner.service';
import { PartnerInfo, Service } from './../../shared/model/partner-info.model';

@Component({
  selector: 'app-partner-info',
  templateUrl: './partner-info.component.html',
  styleUrls: ['./partner-info.component.scss'],
  providers: [PartnerService]
})
export class PartnerInfoComponent implements OnInit {
  partner: PartnerInfo

  imgags: string[];
  imgagsExpart: string[];

  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;


  public carouselTileItemsExpart: Array<any> = [];
  public carouselTileExpart: NgxCarousel;

  public carouselTileOneItemsExpart: Array<any> = [];
  public carouselTileOneExpart: NgxCarousel;

  public carouselTileTwoItemsExpart: Array<any> = [];
  public carouselTileTwoExpart: NgxCarousel;

  constructor(
    private _partnerService: PartnerService
  ) { }

  ngOnInit() {
    this.getPartnerInfo();
    this.imgags = [];
    this.imgagsExpart = [];
  }
  getPartnerInfo() {
    const params = {
      'CompanyId': 36,
      'ServicePartnerId': 17,
      'IsCompany': 1
    }
    this._partnerService.getPartnerInfo(params).subscribe(res => {
      this.partner = res;
      this.carouselTileLoad();

      this.carouselTileOneLoad();
      this.carouselTileTwoLoad();
      this.getCarousel();

      this.carouselTileOneLoadExpart();
      this.carouselTileTwoLoadExpart();
      this.getCarouselExpart();
    });
  }
  // Grid Data Load service and expart
  public carouselTileLoad() {
    this.carouselTileItems = this.partner.Services;
    this.carouselTileItemsExpart = this.partner.Experts;
    console.log(this.partner);
  }
  // Service Grid
  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileOneItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }
  public carouselTileTwoLoad() {
    const len = this.carouselTileTwoItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileTwoItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }
  getCarousel() {
    this.carouselTile = {
      grid: { xs: 4, sm: 9, md: 9, lg: 9, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: false,
        pointStyles: `
            .ngxcarouselPoint {
              list-style-type: none;
              text-align: center;
              padding: 12px;
              margin: 0;
              white-space: nowrap;
              overflow: auto;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 50%;
              background: #6b6b6b;
              padding: 5px;
              margin: 0 3px;
              transition: .4s;
            }
            .ngxcarouselPoint li.active {
                border: 2px solid rgba(0, 0, 0, 0.55);
                transform: scale(1.2);
                background: transparent;
              }
          `
      },
      load: 2,
      loop: false,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

    this.carouselTileOne = {
      grid: { xs: 2, sm: 3, md: 4, lg: 4, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: true,
        pointStyles: `
            .ngxcarouselPoint {
              list-style-type: none;
              text-align: center;
              padding: 12px;
              margin: 0;
              white-space: nowrap;
              overflow: auto;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 50%;
              background: #6b6b6b;
              padding: 5px;
              margin: 0 3px;
              transition: .4s;
            }
            .ngxcarouselPoint li.active {
                border: 2px solid rgba(0, 0, 0, 0.55);
                transform: scale(1.2);
                background: transparent;
              }
          `
      },
      load: 2,
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

    this.carouselTileTwo = {
      grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 230 },
      speed: 600,
      interval: 3000,
      point: {
        visible: true
      },
      load: 2,
      touch: true
    };
  }
  // Expart Grid
  public carouselTileOneLoadExpart() {
    const len = this.carouselTileOneItemsExpart.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileOneItemsExpart.push(
          this.imgagsExpart[Math.floor(Math.random() * this.imgagsExpart.length)]
        );
      }
    }
  }
  public carouselTileTwoLoadExpart() {
    const len = this.carouselTileTwoItemsExpart.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileTwoItemsExpart.push(
          this.imgagsExpart[Math.floor(Math.random() * this.imgagsExpart.length)]
        );
      }
    }
  }
  getCarouselExpart() {
    this.carouselTileExpart = {
      grid: { xs: 4, sm: 9, md: 9, lg: 9, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: false,
        pointStyles: `
            .ngxcarouselPoint {
              list-style-type: none;
              text-align: center;
              padding: 12px;
              margin: 0;
              white-space: nowrap;
              overflow: auto;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 50%;
              background: #6b6b6b;
              padding: 5px;
              margin: 0 3px;
              transition: .4s;
            }
            .ngxcarouselPoint li.active {
                border: 2px solid rgba(0, 0, 0, 0.55);
                transform: scale(1.2);
                background: transparent;
              }
          `
      },
      load: 2,
      loop: false,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

    this.carouselTileOneExpart = {
      grid: { xs: 2, sm: 3, md: 4, lg: 4, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: true,
        pointStyles: `
            .ngxcarouselPoint {
              list-style-type: none;
              text-align: center;
              padding: 12px;
              margin: 0;
              white-space: nowrap;
              overflow: auto;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 50%;
              background: #6b6b6b;
              padding: 5px;
              margin: 0 3px;
              transition: .4s;
            }
            .ngxcarouselPoint li.active {
                border: 2px solid rgba(0, 0, 0, 0.55);
                transform: scale(1.2);
                background: transparent;
              }
          `
      },
      load: 2,
      loop: true,
      touch: true,
      easing: 'ease',
      animation: 'lazy'
    };

    this.carouselTileTwoExpart = {
      grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 230 },
      speed: 600,
      interval: 3000,
      point: {
        visible: true
      },
      load: 2,
      touch: true
    };
  }
}
