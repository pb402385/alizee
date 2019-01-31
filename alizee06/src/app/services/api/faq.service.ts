import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http:HttpClient) { }

  //Méthodes d'accès au web service

  /**
   * API: GET /faq/getAllFaqs.php
   */
  public getAllFAQ() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "faq/getAllFAQ.php";

    //appel du web service
    return this.http.get(API_URL + path, {
      //headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }


  /**
   * API: POST /faq/updateFaq.php
   */
  public postUpdateFaq(faq:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = faq;

    //path
    var path = "faq/updateFaq.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  
  /**
   * API: POST /faq/addFaq.php
   */
  public postAddFaq(faq:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = faq;

    //path
    var path = "faq/addFaq.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  /**
   * API: POST /faq/deleteFaq.php
   */
  public postDeleteFaq(id:string){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = {"id":id};

    //path
    var path = "faq/deleteFaq.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
}
