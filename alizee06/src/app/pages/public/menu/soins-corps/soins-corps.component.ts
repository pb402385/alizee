import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-soins-corps',
  templateUrl: './soins-corps.component.html',
  styleUrls: ['./soins-corps.component.css']
})
export class SoinsCorpsComponent implements OnInit {

  public subMenuCorps:boolean = true; 

  public menuScClicked:number = 0;

  public screenWidth:number = screen.width;

  public produits:any = null;

  public produit:any = null;

  public produitId: any = null;


  constructor(public utils: UtilsService, private route: ActivatedRoute) {
    this.utils.getProduitsByCategorie("1",this);
  }

  ngOnInit() {
    //On récupère l'id de la notification
    this.route.queryParams.subscribe(params => {
      if(params['prod']) this.produitId = ""+JSON.parse(params['prod']);
    });
  }

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

  setMenu(id:number){
    this.produit = this.getProduitByPlace(id);
    this.selectMenu(id);
    this.menuScClicked = id;
  }

  selectMenu(id:number){
    //On supprime la classe selected
    let nb = document.getElementById("subMenu").children.length;

    for(let i=1; i<=nb; i++){
      document.getElementById("menu"+i).removeAttribute("class");
    }

    document.getElementById("menu"+id).setAttribute("class","selected");
  }

  getProduitByPlace(id:any){
    let prod = null;
    for(var i=0; i < this.produits['records'].length; i++){
      if(this.produits['records'][i].place == id){
        prod = this.produits['records'][i];
      }
    }
    return prod;
  }

  getProduitById(produitId){
    let prod = null;
    if(this.produits['records'].length > 0 && this.produitId !== null){
      for(var i=0; i < this.produits['records'].length; i++){
        if(this.produits['records'][i].id == produitId){
          prod = this.produits['records'][i];
          this.produit = prod;
          return true;
        }
      }
    }
    return false;
  }

}
