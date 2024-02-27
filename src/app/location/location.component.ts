import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeService } from '../shared/service/Home/home.service';
import { Area } from '../shared/model/area.model';
import { SearchText } from '../shared/model/search-text.model'
import { SharedlocationService } from '../shared/service/common/sharedlocation.service';
import { AvailableLocation } from '../shared/model/availableLocation.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [HomeService]
})
export class LocationComponent implements OnInit {
  public areas: Area[];
  selectLocation: number;

  myControl = new FormControl();
  options: SearchText[];
  filteredOptions: Observable<SearchText[]>;

  constructor(private _home: HomeService,
    private _sharedlocationService: SharedlocationService) { }

  ngOnInit() {
    this._home.getAvailableLocations().then(
      res => { // Success
        this.areas = this._home.areas;
      }
    );
    this.getLocationSelectedValue()
  }
  onChange(args) {
    const location = new AvailableLocation;
    location.LocationId = args.target.value;
    location.LocationName = args.target.options[args.target.selectedIndex].text;
    this._sharedlocationService.changeAreaId(location);
  }
  getLocationSelectedValue() {
    this._sharedlocationService.locationCast.subscribe((location) => {
      this.selectLocation = location.LocationId
    })
  }

  getSearchText(textValue: string, locationId: number) {
    const params = {
      Name: textValue,
      AssingedAreaId: locationId
    }
    this._home.searchText(params).subscribe(searchText => {
      this.filteredOptions = Observable.of(searchText);
      console.log( this.filteredOptions);
    })
  }

  onKey(event: any) {
    const value = event.target.value;
    this.getSearchText(value, this.selectLocation);
  }
}
