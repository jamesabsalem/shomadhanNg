import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HomeService } from '../../shared/service/Home/home.service';
import { Promise } from '../../shared/model/promise.model';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss'],
  providers: [HomeService]
})
export class PromiseComponent implements OnInit {

  promises: Promise[];

  public bannerImage: Array<any> = [];


    constructor(private home: HomeService) {    }

    ngOnInit() {

    this.home.getPromisesList().then(
      res => { // Success
        this.promises = this.home.promises;
      }
    );
    }
  }










