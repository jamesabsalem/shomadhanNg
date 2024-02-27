import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { PartnerInfo } from '../../shared/model/partner-info.model';
import { PartnerService } from '../../shared/service/partner/partner.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partner-photo-video',
  templateUrl: './partner-photo-video.component.html',
  styleUrls: ['./partner-photo-video.component.scss']
})
export class PartnerPhotoVideoComponent implements OnInit {
  imgags: string[];
  service_img: string[];
  customerFeedBack: PartnerInfo[];
  public carouselBannerItems: Array<any> = [];
  public carouselBanner: NgxCarousel;

  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;

  constructor(
    private _partnerService: PartnerService,
    config: NgbRatingConfig
  ) {
    config.readonly = true;
    config.max = 5;
  }

  ngOnInit() {
    this.imgags = [];
    this.service_img = [];
    this.getReview();
    this.carouselTileOne = {
      grid: { xs: 2, sm: 3, md: 3, lg: 3, all: 0 },
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
      grid: { xs: 2, sm: 3, md: 3, lg: 3, all: 0 },
      speed: 600,
      interval: 3000,
      point: {
        visible: true
      },
      load: 2,
      touch: true
    };

    this.carouselBannerLoad();
    this.carouselTileLoad();
    this.carouselTileOneLoad();
    this.carouselTileTwoLoad();
  }
  getReview() {
    const params = {
      'CompanyId': 36,
    }
    this._partnerService.getCustomerReview(params).subscribe(res => {
      // this.customerFeedBack = res;
    })
  }
  public carouselBannerLoad() {
    const len = this.carouselBannerItems.length;
    if (len <= 4) {
      for (let i = len; i < len + 5; i++) {
        this.carouselBannerItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

  public carouselTileLoad() {
    this.carouselTileItems = this.customerFeedBack;

  }

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

}
