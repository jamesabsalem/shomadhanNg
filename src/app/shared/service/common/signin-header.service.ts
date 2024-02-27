import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninHeaderService {
  private isShow = new BehaviorSubject<boolean>(false);
  public isShowCast = this.isShow.asObservable();
  constructor() { }
  setIsShow(show: boolean) {
    this.isShow.next(show);
  }
}
