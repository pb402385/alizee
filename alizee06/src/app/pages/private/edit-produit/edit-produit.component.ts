import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  public editProduit: boolean = false;
  public categories:any = null;
  public produitsByCategorie:any = [];
  public sortedProducts:any = null;

  // public categoriePlaceSave: any = [];

  public addFormIsActive: any = [];
  public nomToAdd: any = [];
  public is_visibleToAdd: any = [];
  public placeToAdd: any = [];

  public maxPlace: any = [];


  constructor(public utils: UtilsService) { 
    this.categories = this.utils.getAllCategories(this);
    //id, idcategorie, nom, isvisible, place
    this.sortedProducts = this.utils.getAllProduitsSimple(this,false);
  }

  ngOnInit() {
  }

  getProduitByCategorie(){
    for(let i = 0; i < this.sortedProducts.length; i++){

      this.addFormIsActive[i] = false;
      let toto = "";
      debugger;
    }
  }

  editProduits(){
    this.verifyPlaceAndCopy();
    if(this.editProduit == true){
      this.editProduit = false;
    }else{
      this.editProduit = true;
    }
  }

  isVisible(produit){
    if(produit.isvisible == '1'){
      produit.isvisible = '0';
    }else{
      produit.isvisible = '1';
    }
  }

  setNom(produit,event){
    produit.nom = event.currentTarget.value;
  }

  setPlace(produit,event,categorie:any){

    let tmp = null;
    for(let i = 0; i < this.sortedProducts[categorie.id].length; i++){
      if(this.isMissingValue(this.produitsByCategorie[categorie.id][i],categorie)){
        tmp = this.produitsByCategorie[categorie.id][i];
        produit.place = event.value;
      }
    }
    this.setMissingValue(tmp,categorie,produit);
    this.verifyPlaceAndCopy();
  }

  isMissingValue(value:string,categorie:any){
    let categorieId = parseInt(categorie.id);
    for(let i = 0; i < this.sortedProducts[categorie.id].length; i++){
      if(this.sortedProducts[categorie.id][i].place == value && this.sortedProducts[categorie.id][i].place == this.produitsByCategorie[categorieId][i]) return false;
    }
    console.log("missingvalue = " +value);
    return true;
  }

  setMissingValue(oldValue:string,categorie:any,produit:any){
    let newValue = null;
    if(oldValue !== null){
      let categorieId = parseInt(categorie.id);
      for(let i = 0; i < this.sortedProducts[categorie.id].length; i++){

        if(oldValue === this.produitsByCategorie[categorieId][i]){
          console.log(this.sortedProducts[categorie.id][i].place + " = " +oldValue);
          newValue = this.sortedProducts[categorie.id][i].place ;
          //this.sortedProducts[categorie.id][i].place = oldValue;
        }

      }

      if(newValue !== null){
        for(let i = 0; i < this.sortedProducts[categorie.id].length; i++){
          if(newValue === this.sortedProducts[categorie.id][i].place && produit.id !== this.sortedProducts[categorie.id][i].id){
            console.log("newvalue = " +newValue);
            this.sortedProducts[categorie.id][i].place = oldValue;
          }
        }
      }

    }
  }

  verifyPlaceAndCopy(){
    for(let i = 0; i < this.categories.records.length; i++){
      let categorieId = parseInt(this.categories.records[i].id);
      this.produitsByCategorie[categorieId] = [];
      for(let j = 0; j < this.sortedProducts[categorieId].length; j++){
        this.produitsByCategorie[categorieId][j] = this.sortedProducts[categorieId][j].place;
      }
    }
  }







  activeMenuTitle(c){
    //Do nothing
  }

  updateProduitsSimple(produits){
    this.utils.updateProduitsSimple(produits);
  }

  addFormProduit(i){
    if(this.addFormIsActive[i] == false){
      this.addFormIsActive[i] = true;
    }else{
      this.addFormIsActive[i] = false;
    }
  }

  initParamsAddForm(i,id_categorie){
    this.addFormIsActive[i] = false;
    this.nomToAdd[i] = "";
    this.is_visibleToAdd[i] = "1";
    this.placeToAdd[i] = ""+(parseInt(this.getMaxPlace(id_categorie))+1);
  }

  addProduit(i,j){
    let prod:any = {};
    prod.nom = this.nomToAdd[i];
    prod.isvisible = this.is_visibleToAdd[i];
    prod.place = this.placeToAdd[i];
    prod.id_categorie = ""+j;
    prod.id_template = "0";
    this.utils.addProduit(prod)
  }

  setNomToAdd(i,event){
    this.nomToAdd[i] = event.currentTarget.value;
  }

  isVisibleToAdd(i){
    if(this.is_visibleToAdd[i] == '1'){
      this.is_visibleToAdd[i] = '0';
    }else{
      this.is_visibleToAdd[i] = '1';
    }
  }

  getMaxPlace(categorie_id){
    this.maxPlace[categorie_id] = "0";
    for(let i = 0; i < this.sortedProducts[categorie_id].length; i++){
      if(parseInt(this.sortedProducts[categorie_id][i].place) > parseInt(this.maxPlace[categorie_id])){
        this.maxPlace[categorie_id] = this.sortedProducts[categorie_id][i].place;
      }
    }
    return this.maxPlace[categorie_id];
  }



  deleteProduit(id){
    var confirmation = confirm("Etes vous sur de vouloir supprimer ce produit ? (id = "+id+")");
    if(confirmation == true) this.utils.deleteProduit(id);
  } 

}
