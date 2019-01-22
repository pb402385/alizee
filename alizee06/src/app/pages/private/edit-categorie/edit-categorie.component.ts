import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {

  public editCategorie: boolean = false;
  public categories:any = null;

  public categoriePlaceSave: any = [];

  constructor(public utils: UtilsService) { 
    this.categories = this.utils.getAllCategories(this);
  }

  ngOnInit() {
  }

  editCategories(){
    this.verifyPlaceAndCopy();
    if(this.editCategorie == true){
      this.editCategorie = false;
    }else{
      this.editCategorie = true;
    }
  }

  verifyPlaceAndCopy(){
    for(let i = 0; i < this.categories.records.length; i++){
      this.categoriePlaceSave[i] = this.categories.records[i].place;
    }
  }

  isVisible(categorie){
    if(categorie.is_visible == '1'){
      categorie.is_visible = '0';
    }else{
      categorie.is_visible = '1';
    }
  }

  setRouterLink(categorie,event){
    categorie.routerlink = event.currentTarget.value;
  }

  setNom(categorie,event){
    categorie.nom = event.currentTarget.value;
  }

  setPlace(categorie,event){
    let tmp = null;
    for(let i = 0; i < this.categories.records.length; i++){
      if(this.isMissingValue(this.categoriePlaceSave[i])) tmp = this.categoriePlaceSave[i];
    }
    this.setMissingValue(tmp,categorie);
    this.verifyPlaceAndCopy();
  }

  isMissingValue(value:string){
    for(let i = 0; i < this.categories.records.length; i++){
      if(this.categories.records[i].place == value) return false;
    }
    console.log("missingvalue = " +value);
    return true;
  }

  setMissingValue(oldValue:string,categorie:any){
    for(let i = 0; i < this.categories.records.length; i++){
      if(categorie.id !== this.categories.records[i].id && this.categories.records[i].place == categorie.place) console.log(this.categories.records[i].place+ " = " +oldValue);
      if(categorie.id !== this.categories.records[i].id && this.categories.records[i].place == categorie.place) this.categories.records[i].place = oldValue;
    }
  }









  updateCategories(){
    alert("to implement!");
  }

  addFormCategorie(){
    alert("to implement!");
  }

}
