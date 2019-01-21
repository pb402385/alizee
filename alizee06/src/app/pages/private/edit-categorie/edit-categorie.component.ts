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
    let tmp = ''+event.value;
    for(let i = 0; i < this.categories.records.length; i++){
      if(this.categoriePlaceSave[i] == tmp) this.categories.records[i].place = categorie.place;
    }
    categorie.place = tmp;
    this.verifyPlaceAndCopy();
  }









  updateCategories(){
    alert("to implement!");
  }

  addFormCategorie(){
    alert("to implement!");
  }

}
