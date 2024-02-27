import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvailableLocation } from '../../model/availableLocation.model'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SharedlocationService {
  private location = new BehaviorSubject<AvailableLocation>({ LocationId: 0, LocationName: '' })
  public locationCast = this.location.asObservable();

  constructor(private _cookieService: CookieService) { }

  changeAreaId(availableLocation: AvailableLocation) {
    this.location.next(availableLocation);
    this._cookieService.set('location', JSON.stringify(availableLocation), 7);
  }
  getLocation() {
    const cookieExists: boolean = this._cookieService.check('location');
    if (cookieExists) {
      this.location.next(JSON.parse(this._cookieService.get('location')));
    }
  }
}
