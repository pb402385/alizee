import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TarifService {

  constructor(private http:HttpClient) { }

  //Méthodes d'accès au web service

  /**
   * API: GET /tarifs/getAllTarifs.php
   */
  public getAllTarifs() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "tarifs/getAllTarifs.php";

    //appel du web service
    return this.http.get(API_URL + path, {
      //headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  
  
  
  
  
  
  
  
  
  /**
   * API: POST /tarif/updateTarif.php
   */
  public postUpdateTarif(tarif:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = tarif;

    //path
    var path = "tarif/updateTarif.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  
  /**
   * API: POST /tarif/addTarif.php
   */
  public postAddTarif(tarif:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = tarif;

    //path
    var path = "tarif/addTarif.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  /**
   * API: POST /tarif/deleteTarif.php
   */
  public postDeleteTarif(id:number){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = {"id":id};

    //path
    var path = "tarif/deleteTarif.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
}
