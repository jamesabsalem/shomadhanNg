import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  imgags: string[];
  service_img: string[];

    public carouselBannerItems: Array<any> = [];
    public carouselBanner: NgxCarousel;

    public carouselTileItems: Array<any> = [];
    public carouselTile: NgxCarousel;

    public carouselTileOneItems: Array<any> = [];
    public carouselTileOne: NgxCarousel;

    public carouselTileTwoItems: Array<any> = [];
    public carouselTileTwo: NgxCarousel;

    constructor() {}

    ngOnInit() {
      this.imgags = [
        'assets/img/daniel-olahh.jpg',
        'assets/img/bruno-abatti.jpg',
        'assets/img/daniel-olahs.jpg'
      ];
      this.service_img = [
        'assets/img/Home/icon_beauty_services.png',
        'assets/img/Home/icon_home_maintanace.png',
        'assets/img/Home/icon_it_services.png',
        'assets/img/Home/icon_cleaning_services.png',
        'assets/img/Home/icon_Automobile.png',
        'assets/img/Home/icon_Electronic.png',
        'assets/img/Home/icon_photoghraphy.png',
        'assets/img/Home/icon_beauty_services.png',
        'assets/img/Home/icon_home_maintanace.png',
        'assets/img/Home/icon_it_services.png',
        'assets/img/Home/icon_cleaning_services.png',
        'assets/img/Home/icon_Automobile.png',
        'assets/img/Home/icon_Electronic.png',
        'assets/img/Home/icon_photoghraphy.png'
      ]

      this.carouselBanner = {
        grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },

        slide: 4,
        speed: 500,
        interval: 5000,
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
              position: absolute;
              width: 100%;
              bottom: 20px;
              left: 0;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.55);
              padding: 5px;
              margin: 0 3px;
              transition: .4s ease all;
            }
            .ngxcarouselPoint li.active {
                background: white;
                width: 10px;
            }
          `
        },
        load: 2,
        custom: 'banner',
        touch: true,
        loop: false,
        easing: 'cubic-bezier(0, 0, 0.2, 1)'
      };

      this.carouselTile = {
        grid: { xs: 3, sm: 4, md: 6, lg: 9, all: 0 },
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
        grid: { xs: 1, sm: 3, md: 3, lg: 3, all: 230 },
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

    onmoveFn(data) {
      // console.log(data);
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
      this.carouselTileItems = this.service_img;
      // const len = this.carouselTileItems.length;
     // if (len <= 30) {
      //  for (let i = len; i < len + 15; i++) {
        //  this.carouselTileItems.push(
         //   this.imgags[Math.floor(Math.random() * this.imgags.length)]
         // );
      //  }
     // }
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

