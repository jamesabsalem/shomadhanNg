import { AvailableLocation } from '../../shared/model/availableLocation.model';
import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { CategoryService } from '../../shared/service/category/category.service';
import { SharedlocationService } from '../../shared/service/common/sharedlocation.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { MainService } from '../../shared/model/mainservice.model';
import { DataStorage } from '../../service/data-storage.service';

@Component({
  selector: 'app-mainservices',
  templateUrl: './mainservices.component.html',
  styleUrls: ['./mainservices.component.scss'],
  providers: [CategoryService]
})
export class MainservicesComponent implements OnInit {
  areaId: number;
  areaName: string;
  imgags: string[];
  service_img: string[];

  public carouselTileItems: Array<any> = [];
  public carouselTile: NgxCarousel;

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;

  constructor(
    private sharedlocationService: SharedlocationService,
    private categoryService: CategoryService,
    private _router: Router,
    private dataStorage: DataStorage
  ) {}

  ngOnInit() {
    this.sharedlocationService.locationCast.subscribe(location => {
      this.areaId = location.LocationId;
      this.areaName = location.LocationName;
      this.getMainCategory(location.LocationId);
    });
    this.carouselTileLoad();
    this.carouselTileOneLoad();
    this.carouselTileTwoLoad();
    this.getCarousel();
  }

  innerLink(mainService: MainService) {
    if (+this.areaId === 0 || this.areaId === null || this.areaId === undefined) {
      swal({
        icon: 'info',
        title: 'Please select your area'
      });
      return;
    }

    if (mainService.IsAssistant) {
      this._router.navigate([`assistant/${this.areaName.toLowerCase()}`]);
    } else {
      this._router.navigateByUrl(`category/${this.areaName.toRouteString()}/${mainService.Name.toRouteString()}`);
    }
  }

  public getMainCategory(locationId: number) {
    this.categoryService.getMainServices(locationId).then(res => {
      // Success
      this.carouselTileLoad();
    });
    this.imgags = [];
    this.service_img = [];
  }

  public carouselTileLoad() {
    this.carouselTileItems = this.categoryService.mainServices;
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
}
