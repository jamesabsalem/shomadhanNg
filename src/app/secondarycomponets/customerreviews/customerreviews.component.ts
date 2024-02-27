import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HomeService } from '../../shared/service/Home/home.service';
import { Review } from '../../shared/model/review.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ParamsService } from '../../service/params.service';

@Component({
  selector: 'app-customerreviews',
  templateUrl: './customerreviews.component.html',
  styleUrls: ['./customerreviews.component.scss'],
  providers: [HomeService]
})
export class CustomerReviewComponent implements OnInit {
  public customerReview: Review[];
  currentRate: number;
  constructor(
    private home: HomeService,
    config: NgbRatingConfig,
    private _activatedRoute: ActivatedRoute,
    private paramsService: ParamsService
  ) {
    config.readonly = true;
    config.max = 5;
  }
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      // const { areaId, serviceId, innderId } = params;
      // this.getReview(serviceId);
      const { serviceName } = params;

      this.paramsService.getServiceIdByName(serviceName.toOriginalString()).subscribe(service => {
        const { Id: serviceId } = service;
        this.getReview(serviceId);
      });
    });
  }
  getReview(serviceId) {
    this.home.getCustomerReviews(serviceId).then(res => {
      // Success
      this.customerReview = this.home.reviews;
    });
  }
}
