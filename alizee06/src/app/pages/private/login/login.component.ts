import { Component, OnInit, Input, NgZone } from '@angular/core';

import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public connection:number = null;
  public message: string = null;

  public emptyPassword: boolean = true;
  public emptyName: boolean = true;

  constructor(private zone: NgZone,private http:HttpClient) { }

  ngOnInit() {
  }

  showVal(){
    let name = <HTMLInputElement>document.getElementById('Name');
    let mdp = <HTMLInputElement>document.getElementById('Password');
    alert(name.value);
    alert(mdp.value);
  }

  effectBlur(el){
    let val = <HTMLInputElement>document.getElementById(el);
    if (val.value){
      document.getElementById('label'+el).className = 'used';
    }else{
      document.getElementById('label'+el).className = '';
    }
  }

  //Méthodes d'accès au web service

  /**
   * API: POST /ruby/getRuby.php
   */
  public postLoginAdmin() :any{

    //header
    var requestHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    .append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    let name = <HTMLInputElement>document.getElementById('Name');
    let mdp = <HTMLInputElement>document.getElementById('Password');

    let body = { "name" : ""+name.value, "mdp" : ""+mdp.value };

    //path
    var path = "ruby/getRuby.php";

    //appel du web service
    return this.http.post(API_URL + path,  body, {
      headers: requestHeaders,
      observe: 'response',
      responseType: "text"
    });
  }

  public login(){
    this.postLoginAdmin().subscribe(
      response => {

        //On récupère le token
        let responseJSON = response.body; 
        this.connection = JSON.parse(responseJSON).connection;
        if(this.connection == 1){
          localStorage.setItem("role", "ruby");
          localStorage.setItem("token", JSON.parse(responseJSON).token);
        }else{
          localStorage.setItem("token", "");
        }
        this.message = JSON.parse(responseJSON).message;    

      },
      error =>{
        let name = <HTMLInputElement>document.getElementById('inputName');
        let mdp = <HTMLInputElement>document.getElementById('inputPassword');
        name.value = "";
        mdp.value = "";
        alert("erreur");
      }                    
    );
  }


  public isEmpty(id){
    let elem =<HTMLInputElement>document.getElementById(id);
    if(elem.value == null || elem.value == undefined || elem.value == ""){
      if(id == 'Name') this.emptyName = true;
      if(id == 'Password') this.emptyName = true;
      return true;
    }else{
      if(id == 'Name') this.emptyPassword = true;
      if(id == 'Password') this.emptyPassword = true;
      return false;
    }
  }

}
