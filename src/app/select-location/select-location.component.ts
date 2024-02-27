import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/service/Home/home.service';
import { Area } from '../shared/model/area.model';
import { SharedlocationService } from '../shared/service/common/sharedlocation.service';
import { AvailableLocation } from '../shared/model/availableLocation.model';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
  providers: [HomeService]
})
export class SelectLocationComponent implements OnInit {
  public areas: Area[];
  selectLocation: number;

  constructor(
    private _ngbActiveModal: NgbActiveModal,
    private _home: HomeService,
    private _sharedlocationService: SharedlocationService
  ) { }

  ngOnInit() {
    this._home.getAvailableLocations().then(
      res => { // Success
        this.areas = this._home.areas;
      }
    );
    this.getLocationSelectedValue()
  }
  getLocationSelectedValue() {
    this._sharedlocationService.locationCast.subscribe((location) => {
      this.selectLocation = location.LocationId
    })
  }
  onChange(args) {
    const location = new AvailableLocation;
    location.LocationId = args.target.value;
    location.LocationName = args.target.options[args.target.selectedIndex].text;
    this._sharedlocationService.changeAreaId(location);
  }
  locationLeftArrow() {
    this._ngbActiveModal.close('close modal');
  }
  locationClose() {
    this._ngbActiveModal.close('close modal');
  }
}
