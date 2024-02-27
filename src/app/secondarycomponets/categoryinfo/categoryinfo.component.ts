import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HomeService } from '../../shared/service/Home/home.service';
import { Promise } from '../../shared/model/promise.model';

@Component({
  selector: 'app-categoryinfo',
  templateUrl: './categoryinfo.component.html',
  styleUrls: ['./categoryinfo.component.scss'],
  providers: [HomeService]
})
export class CategoryInfoComponent implements OnInit {

  promises: Promise[];

  public bannerImage: Array<any> = [];


    constructor(private home: HomeService) {    }

    ngOnInit() {
    }


  }
