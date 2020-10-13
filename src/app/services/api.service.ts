import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_CONSTANTS } from '../services/api-url.constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRequest() {
    const method = 'GET';
    const url = `${URL_CONSTANTS.TODO.FETCH_ALL_TASK}`
    return this.http.request(method, url);
  }

  postRequest(body: any, options = {}) {
    const method = 'POST';
    const url = `${URL_CONSTANTS.TODO.INSERT_TASK}`
    return this.http.request(method, url, {
      body,
      ...options
    });
  }


}
