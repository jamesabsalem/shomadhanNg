import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import 'rxjs/Rx';
import { SubCategory } from '../models/sub-category.model';

const API_BASE_URL = environment.apiUrl;
const tokenKey = environment.tokenKey;
const tokenValue = environment.tokenValue;


const headers = new HttpHeaders().set('Content-Type', `application/json`)
.set(tokenKey, tokenValue);

// const httpOptions = {
//   headers: new HttpHeaders({
//    'Content-Type': 'application/json',
//    'ShTk': 'c3BsJDIwMTg=' })
// };

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  public post<T>(url, body) {
    return this.http
      .post<T>(API_BASE_URL + url, body, { headers })
      .map(res => res);
  }
}
