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

  public addFormIsActive: boolean = false;
  public nomToAdd: string = "";
  public is_visibleToAdd: string = "";
  public placeToAdd: string = "";
  public routerlinkToAdd: string = "";

  public maxPlace: string = "0";


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
      if(parseInt(this.categories.records[i].place) > parseInt(this.maxPlace)) this.maxPlace = this.categories.records[i].place;
    }
    this.placeToAdd = ""+(parseInt(this.maxPlace)+1);
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
    this.utils.updateCategorie(this.categories.records)
  }

  addFormCategorie(){
    if(this.addFormIsActive == false){
      this.addFormIsActive = true;
    }else{
      this.addFormIsActive = false;
    }
  }

  initParamsAddForm(){
    this.addFormIsActive = false;
    this.nomToAdd = "";
    this.is_visibleToAdd = "";
    this.placeToAdd = ""+(parseInt(this.maxPlace)+1);
    this.routerlinkToAdd = "";
  }

  addCategorie(){
    let cat:any = {};
    cat.nom = this.nomToAdd;
    cat.is_visible = this.is_visibleToAdd;
    cat.place = this.placeToAdd;
    cat.routerlink = this.routerlinkToAdd;
    this.utils.addCategorie(cat)
  }

  setNomToAdd(event){
    this.nomToAdd = event.currentTarget.value;
  }

  setRouterLinkToAdd(event){
    this.routerlinkToAdd = event.currentTarget.value;
  }

  isVisibleToAdd(){
    if(this.is_visibleToAdd == '1'){
      this.is_visibleToAdd = '0';
    }else{
      this.is_visibleToAdd = '1';
    }
  }



  deleteCategorie(id){
    if(parseInt(id) > 3){
      var confirmation = confirm("Etes vous sur de vouloir supprimer ce produit ? (id = "+id+")");
      if(confirmation == true) this.utils.deleteCategorie(id);
    }else{
      alert("Suppression impossible d'une des 4 premères catégories!");
    }
  } 

}
