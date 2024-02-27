import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HomeBanner } from '../../shared/model/components.homeBanner';
import { HomeBannerService } from '../../shared/service/banner/homebanner.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [HomeBannerService]
})
export class BannerComponent implements OnInit {


  public bannerImage: Array<any> = [];


  constructor(private bannerService: HomeBannerService) { }

  ngOnInit() {
    // this.imgags = [];
    this.bannerService.getHomeBannerList().then(
      res => { // Success
        this.bannerImage = this.bannerService.bannerList;
      }
    );
  }
}










