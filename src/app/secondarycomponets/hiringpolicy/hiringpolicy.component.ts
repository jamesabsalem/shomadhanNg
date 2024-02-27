import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HomeService } from '../../shared/service/Home/home.service';
import { Promise } from '../../shared/model/promise.model';

@Component({
  selector: 'app-hiringpolicy',
  templateUrl: './hiringpolicy.component.html',
  styleUrls: ['./hiringpolicy.component.scss'],
  providers: [HomeService]
})
export class HiringPolicyComponent implements OnInit {

  promises: Promise[];

  public bannerImage: Array<any> = [];


    constructor(private home: HomeService) {    }

    ngOnInit() {

    }


  }
