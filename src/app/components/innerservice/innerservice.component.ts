import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { CategoryService } from '../../shared/service/category/category.service';
import { AvailabelService } from '../../shared/model/availabelService.model';
import { InnterCategoryDetails } from '../../shared/model/innerCategoryDetails.mode';
import { InnerServices } from '../../shared/model/innerServices.model';
import { MainService } from '../../shared/model/mainservice.model';
import { SharedlocationService } from '../../shared/service/common/sharedlocation.service';

@Component({
  selector: 'app-innerservice',
  templateUrl: './innerservice.component.html',
  styleUrls: ['./innerservice.component.scss'],
  providers: [CategoryService]
})
export class InnerserviceComponent implements OnInit {
  areaId: number;
  areaName: string;
  imgags: string[];
  service_img: string[];
  public innerService: InnerServices;
  public innerCategory: MainService[];
  public innerCategoryDetails: InnterCategoryDetails[];
  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;

  constructor(
    private categoryService: CategoryService,
    private sharedlocationService: SharedlocationService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.sharedlocationService.locationCast.subscribe(location => {
      this.getInnderCategory(location.LocationId);
      this.areaId = location.LocationId;
      this.areaName = location.LocationName;
    });
    this.imgags = [];
    this.service_img = [];
    this.carouselTileLoad();
    this.carouselTileOneLoad();
    this.carouselTileTwoLoad();
    this.getCarousel();
  }
  getInnderCategory(locationId: number) {
    this.categoryService.getInnerServices(locationId).then(res => {
      // Success
      this.innerService = this.categoryService.innerService;
      this.innerCategory = this.innerService.InnerCategoryInitials;
      this.innerCategoryDetails = this.innerService.InnerCategoryDetails;
    });
  }
  innerLink(serviceName: string, innserServiceName: string) {
    this._router.navigateByUrl(
      `category/${this.areaName.toRouteString()}/${serviceName.toRouteString()}/${innserServiceName.toRouteString()}`
    );
  }
  public carouselTileLoad() {
    this.carouselTileItems = this.categoryService.innerCategoryDetails;
  }
  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileOneItems.push(this.imgags[Math.floor(Math.random() * this.imgags.length)]);
      }
    }
  }
  public carouselTileTwoLoad() {
    const len = this.carouselTileTwoItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileTwoItems.push(this.imgags[Math.floor(Math.random() * this.imgags.length)]);
      }
    }
  }
  public getCarousel() {
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
      grid: { xs: 2, sm: 3, md: 4, lg: 4, all: 0 },
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
