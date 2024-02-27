import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/service/Home/home.service';
import { Area } from '../../shared/model/area.model';
import { SharedlocationService } from '../../shared/service/common/sharedlocation.service';

@Component({
  selector: 'app-availableareas',
  templateUrl: './availableareas.component.html',
  styleUrls: ['./availableareas.component.scss'],
  providers: [HomeService, SharedlocationService]
})
export class AvailableAreaComponent implements OnInit {
  public areas: Area[];
  constructor(private home: HomeService, private sharedlocationService: SharedlocationService) { }
  ngOnInit() {
    this.home.getAvailableAreas().then(
      res => { // Success
        this.areas = this.home.areas;
      }
    );
  }
  onChange(areaId: number) {
    // this.sharedlocationService.changeAreaId(areaId);
  }
}

