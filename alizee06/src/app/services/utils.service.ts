import { Injectable, NgZone } from '@angular/core';

import { CategorieService } from './api/categorie.service';
import { ProduitService } from './api/produit.service';
import { TarifService } from './api/tarif.service';
import { DisconnectService } from './api/disconnect.service';

import { ErrorLogService } from './error-log/error-log.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public errorLog401: string = null;
  public successLog: string = null;

  private categories: any = null;

  constructor(private zone: NgZone,
    private categorieService: CategorieService,
    private produitService: ProduitService,
    private tarifService: TarifService,
    private disconnectService: DisconnectService,
    private errorService: ErrorLogService) { 

  }


  /**
   *  METHODES PUBLIC GET
   */

  getProduitsByCategorie(id:any,classe:any){
    //On fait un appel au web service des produits
    this.produitService.getAllProduitsByCategorie(id).subscribe(
      response => {

        //On récupère les produits
        let responseJSON = response.body;
        classe.produits = JSON.parse(responseJSON);

      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getProduitsByCategorie",this);
      } 
    );
  }


  getInfoForMenu(classe:any){
    //On fait un appel au web service des categories
    this.categorieService.getAllCategories().subscribe(
      response => {

        //On récupère les categories
        let responseJSON = response.body;
        classe.categories = JSON.parse(responseJSON);
        this.categories = classe.categories;

        this.getAllProduitsSimple(classe);
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getAllCategories",this);
        return error;
      } 
    );
  }


  getAllCategories(classe:any){
    //On fait un appel au web service des notifications
    this.categorieService.getAllCategories().subscribe(
      response => {

        //On récupère les categories
        let responseJSON = response.body;
        classe.categories = JSON.parse(responseJSON);
        this.categories = classe.categories;
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getAllCategories",this);
        return error;
      } 
    );
  }

  getAllProduits(){
    //On fait un appel au web service des produits
    this.produitService.getAllProduits().subscribe(
      response => {

        //On récupère les produits
        let responseJSON = response.body;
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getAllProduits",this);
      } 
    );
  }

  getAllProduitsSimple(classe:any){
    //On fait un appel au web service des produits
    this.produitService.getAllProduits().subscribe(
      response => {

        //On récupère les produits
        let responseJSON = response.body;
        classe.produits = JSON.parse(responseJSON);

        //On trie les produits par categorie
        let array = [];
        for(let i = 0; i < this.categories.records.length; i++){
          array[i] = [];
          if(location.href.indexOf(this.categories.records[i].routerlink) >= 0) classe.activeMenuTitle(this.categories.records[i].place);   
        }
        for(let i = 0; i < classe.produits.records.length; i++){
          array[classe.produits.records[i].id_categorie].push(classe.produits.records[i]);
        }
        classe.sortedProducts = array;
        return classe.sortedProducts;
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getAllProduitsSimple",this);
      } 
    );
  }

  getAllTarifs(){
    //On fait un appel au web service des tarifs
    this.tarifService.getAllTarifs().subscribe(
      response => {

        //On récupère les tarifs
        let responseJSON = response.body;
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getAllTarifs",this);
      } 
    );
  }








  /**
   *  METHODE DECONNEXION
   */


  /**
   * API: GET /ruby/getRuby.php
   */
  public disconnect() :any{
    //On fait un appel au web service de deconnexion
    this.disconnectService.getDisconnect().subscribe(
      response => {
        localStorage.setItem("role", "user");
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getRuby",this);
      } 
    );
  }







  /**
   *  METHODES ADMIN POST
   */
  updateProduit(produit:any){
    this.produitService.postUpdateProduit(produit).subscribe(
      response => {
        this.successLog = "Mise à jour du produit réalisée avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/updateProduit",this);
      } 
    );
  }
  
  updateCategorie(categorie:any){
    this.categorieService.postUpdateCategorie(categorie).subscribe(
      response => {
        this.successLog = "Mise à jour de la catégorie réalisée avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/updateCategorie",this);
      } 
    );
  }
  
  updateTarif(tarif:any){
    this.tarifService.postUpdateTarif(tarif).subscribe(
      response => {
        this.successLog = "Mise à jour du tarif réalisée avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/updateTarif",this);
      } 
    );
  }
  
  
  
  
  addProduit(produit:any){
    this.produitService.postAddProduit(produit).subscribe(
      response => {
        this.successLog = "Ajout du produit réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/addProduit",this);
      } 
    );
  }
  
  addCategorie(categorie:any){
    this.categorieService.postAddCategorie(categorie).subscribe(
      response => {
        this.successLog = "Ajout de la catégorie réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/addCategorie",this);
      } 
    );
  }
  
  addTarif(tarif:any){
    this.tarifService.postAddTarif(tarif).subscribe(
      response => {
        this.successLog = "Ajout du tarif réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/addTarif",this);
      } 
    );
  }
  
  
  
  
  deleteProduit(id:number){
    this.produitService.postDeleteProduit(id).subscribe(
      response => {
        this.successLog = "Ajout du produit réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/deleteProduit",this);
      } 
    );
  }
  
  deleteCategorie(id:number){
    this.categorieService.postDeleteCategorie(id).subscribe(
      response => {
        this.successLog = "Ajout de la catégorie réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/deleteCategorie",this);
      } 
    );
  }
  
  deleteTarif(id:number){
    this.tarifService.postDeleteTarif(id).subscribe(
      response => {
        this.successLog = "Ajout du tarif réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/deleteTarif",this);
      } 
    );
  }




  /**
   * AUTRES METHODES
   */


  isUnderConstruction(){
    if(localStorage.getItem('role') !== "user"){
      return true;
    }else{
      return false;
    }
  }

  /** Check if session is valid */
  readLocalStorageValue() {
    return (localStorage.getItem('role') == 'ruby');
  }

  fixBottom(){
    this.zone.runOutsideAngular(() => {
      setTimeout(function(){
        document.getElementById('footer').style.bottom = "inherit";

        var hd = document.body.offsetHeight;
        
        if(document.getElementById('footer') !== null){
          var footer = document.getElementById('footer').getBoundingClientRect();
          //On recupere la position y du footer
          var pf = footer.top;
          //On recupere la hauteur du footer
          var hf = footer.bottom - footer.top;
          //On fait un calcul magique
          
          console.log(hd+":"+(pf+hf));
          
          if(hd < pf+hf+1){
            document.getElementById('footer').style.bottom = 0+"px";
          }else{
            document.getElementById('footer').style.bottom = (pf+hf)-hd+"px";
          }

          //alert("changed hd="+hd+" pf+hf="+(pf+hf));
        }
      }, 100);
    });
  }

}
