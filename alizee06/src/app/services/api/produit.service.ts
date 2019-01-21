import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }

  //Méthodes d'accès au web service

  /**
   * API: GET /produit/getAllProduits.php
   */
  public getAllProduits() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "produit/getAllProduits.php";

    //appel du web service
    return this.http.get(API_URL + path, {
      //headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }

  /**
   * API: GET /produit/getAllProduitsSimple.php
   */
  public getAllProduitsSimple() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "produit/getAllProduitsSimple.php";

    //appel du web service
    return this.http.get(API_URL + path, {
      //headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }

  /**
   * API: GET /produit/getAllProduitsSimple.php
   */
  public getAllProduitsByCategorie(id:any) :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, OPTIONS");

    //path
    var path = "produit/getAllProduitsByCategorie.php?id="+id;

    //appel du web service
    return this.http.get(API_URL + path, {
      //headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }



  /**
   * API: POST /produit/updateProduit.php
   */
  public postUpdateProduit(produit:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = produit;

    //path
    var path = "produit/updateProduit.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  
  /**
   * API: POST /produit/addProduit.php
   */
  public postAddProduit(produit:any){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = produit;

    //path
    var path = "produit/addProduit.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
  /**
   * API: POST /produit/deleteProduit.php
   */
  public postDeleteProduit(id:number){
    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .append("Content-Type", "application/json");

    let body = {"id":id};

    //path
    var path = "produit/deleteProduit.php?token="+localStorage.getItem("token");

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }
  
}
