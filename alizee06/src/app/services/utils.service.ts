import { Injectable, NgZone } from '@angular/core';

import { CategorieService } from './api/categorie.service';
import { ProduitService } from './api/produit.service';
import { TarifService } from './api/tarif.service';
import { FaqService } from './api/faq.service';
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
    private faqService: FaqService,
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

        //TODO Order by place

        classe.produits = JSON.parse(responseJSON);

      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getProduitsByCategorie",this);
      } 
    );
  }


  getInfoForMenu(classe:any,mode:boolean){
    //On fait un appel au web service des categories
    this.categorieService.getAllCategories().subscribe(
      response => {

        //On récupère les categories
        let responseJSON = response.body;
        classe.categories = this.sortCategories(JSON.parse(responseJSON));
        this.categories = classe.categories;

        this.getAllProduitsSimple(classe,mode);
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

  getAllFAQ(classe:any){
    //On fait un appel au web service des produits
    this.faqService.getAllFAQ().subscribe(
      response => {

        //On récupère les produits
        let responseJSON = response.body;
        classe.faqs = JSON.parse(responseJSON);
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/getAllFAQ",this);
      } 
    );
  }

  getAllProduitsSimple(classe:any,mode:boolean){
    //On fait un appel au web service des produits
    this.produitService.getAllProduits().subscribe(
      response => {

        //On récupère les produits
        let responseJSON = response.body;
        classe.produits = JSON.parse(responseJSON);

        //On trie les produits par categorie
        let array = [];
        for(let i = 0; i < this.categories.records.length; i++){
            array[this.categories.records[i].id] = [];
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
        this.successLog = "Mise à jour du produit réalisé avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/updateProduit",this);
      } 
    );
  }

  updateFAQ(faq:any){
    this.faqService.postUpdateFaq(faq).subscribe(
      response => {
        this.successLog = "Mise à jour de la FAQ réalisée avec succès!"
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/updateFAQ",this);
      } 
    );
  }

  updateProduitsSimple(produits:any){
    this.produitService.postUpdateProduitsSimple(produits).subscribe(
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
        this.successLog = "Ajout du produit réalisé avec succès!";
        location.reload();
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/addProduit",this);
      } 
    );
  }

  addFAQ(faq:any){
    this.faqService.postAddFaq(faq).subscribe(
      response => {
        this.successLog = "Ajout de la FAQ réalisée avec succès!";
        location.reload();
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/addFAQ",this);
      } 
    );
  }
  
  addCategorie(categorie:any){
    this.categorieService.postAddCategorie(categorie).subscribe(
      response => {
        this.successLog = "Ajout de la catégorie réalisé avec succès!";
        location.reload();
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
        this.successLog = "Ajout du tarif réalisé avec succès!";
        location.reload();
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/addTarif",this);
      } 
    );
  }
  
  
  
  
  deleteProduit(id:string){
    this.produitService.postDeleteProduit(id).subscribe(
      response => {
        this.successLog = "Suppression du produit réalisée avec succès!";
        location.reload();
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/deleteProduit",this);
      } 
    );
  }

  deleteFAQ(id:string){
    this.faqService.postDeleteFaq(id).subscribe(
      response => {
        this.successLog = "Suppression de la FAQ réalisée avec succès!";
        location.reload();
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/deleteFAQ",this);
      } 
    );
  }
  
  deleteCategorie(id:string){
    this.categorieService.postDeleteCategorie(id).subscribe(
      response => {
        this.successLog = "Suppression de la catégorie réalisée avec succès!";
        location.reload();
      },
      error =>{
        //En cas d'ereur on affiche le message d'erreur
        if(error) this.errorService.errorManagement(error,"/deleteCategorie",this);
      } 
    );
  }
  
  deleteTarif(id:string){
    this.tarifService.postDeleteTarif(id).subscribe(
      response => {
        this.successLog = "Suppression du tarif réalisée avec succès!";
        location.reload();
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


  sortCategories(categories:any){
    let categoriesFiltred: any = {};
    categoriesFiltred.records = [];
    let cpt = 0;

    //On restire les nons visibles
    for(let i = 0; i < categories.records.length; i++){
      if(categories.records[i].is_visible == '1'){
        categoriesFiltred.records[cpt] = {};
        categoriesFiltred.records[cpt] = categories.records[i];
        cpt++;
      }
    }

    console.log(categoriesFiltred);

    //On les classe par place
    for(let i = 0; i < categoriesFiltred.records.length; i++){
      for(let j = 0; j < categoriesFiltred.records.length; j++){
        if(parseInt(categoriesFiltred.records[i].place) < parseInt(categoriesFiltred.records[j].place)){
          let tmp = categoriesFiltred.records[i];
          categoriesFiltred.records[i] = categoriesFiltred.records[j];
          categoriesFiltred.records[j] = tmp;
        }
      }
    }



    return categoriesFiltred;
  }


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
