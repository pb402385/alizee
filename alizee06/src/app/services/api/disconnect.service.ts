import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DisconnectService {

  constructor(private http:HttpClient) { }


  /**
   * API: GET /ruby/getRuby.php
   */
  public getDisconnect() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "ruby/getRuby.php";

    //appel du web service
    return this.http.get(API_URL + path, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }

}
