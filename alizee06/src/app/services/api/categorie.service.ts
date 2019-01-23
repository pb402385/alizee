import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http:HttpClient) { }

  //Méthodes d'accès au web service

  /**
   * API: GET /categorie/getAllCategories.php
   */
  public getAllCategories() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "categorie/getAllCategories.php";

    //appel du web service
    return this.http.get(API_URL + path, {
      //headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  
  
  
  
  
  
  /**
   * API: POST /categorie/updateCategorie.php
   */
  public postUpdateCategorie(categories:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = categories;

    //path
    var path = "categorie/updateCategorie.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  
  /**
   * API: POST /categorie/addCategorie.php
   */
  public postAddCategorie(categorie:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = categorie;

    //path
    var path = "categorie/addCategorie.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  /**
   * API: POST /categorie/deleteCategorie.php
   */
  public postDeleteCategorie(id:string){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = {"id":id};

    //path
    var path = "categorie/deleteCategorie.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
}
