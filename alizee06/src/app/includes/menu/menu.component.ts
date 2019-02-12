import { Component, OnInit, Input } from '@angular/core';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public subMenuVisage:boolean = false;
  public subMenuCorps:boolean = false;
  


  public menuResponsiveActivated = false;

  public categories:any = null;
  public produits:any = null;
  public sortedProducts: any = null;
  public windowSize = window.innerWidth;

  @Input() screenWidth:number = window.innerWidth;

  public menuClicked:number = 0;


  constructor(public utils: UtilsService) { 
    this.sortedProducts = this.utils.getInfoForMenu(this,true);
  }

  ngOnInit() {
    this.windowSize = window.innerWidth;
    if(this.screenWidth <= 700){
      setTimeout(function(){ 
        document.getElementById("subtopnav").style.display = "none";
      }, 100);
    }else{
      setTimeout(function(){ 
        document.getElementById("subtopnav").style.display = "inherit";
        document.getElementById("subtopnavMobile").style.display = "none";
      }, 100);     
    }
  }

  ngOnChange() {
    this.windowSize = window.innerWidth;
    if(this.screenWidth <= 700){
      setTimeout(function(){ 
        document.getElementById("subtopnav").style.display = "none";
      }, 100);
    }else{
      setTimeout(function(){ 
        document.getElementById("subtopnav").style.display = "inherit";
        document.getElementById("subtopnavMobile").style.display = "none";
      }, 100);     
    }
  }


  activeMenuResponsive() {

    if(this.menuResponsiveActivated == false){
      document.getElementById("subtopnavMobile").style.display = "inherit";
      this.menuResponsiveActivated = true;
    }else{
      document.getElementById("subtopnavMobile").style.display = "none";
      this.menuResponsiveActivated = false;
    }

    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }

  activeMenuTitle(id:number) {
    document.getElementById("menuTitle-1").className = "";
    let menuLength = document.getElementById("myTopnav").children.length - 3;
    for(let i=0; i<=menuLength; i++){
      document.getElementById("menuTitle"+i).className = "";
    }
    document.getElementById("menuTitle"+id).className = "active";
  }

  openSubMenu(id:string){
    let dropdownContent = document.getElementById("content"+id);
    let dropdownButton =  document.getElementById("menuBtn"+id);
    if (dropdownContent.style.display === "block") {
      dropdownButton.removeAttribute("class");
      dropdownButton.setAttribute("class","dropdown-btn");
      dropdownContent.style.display = "none";
    } else {
      dropdownButton.setAttribute("class","dropdown-btn activeSub");
      dropdownContent.style.display = "block";
    }
  }

  setMenu(id:number,categorieId:any){
    this.selectMenu(id,categorieId);
    this.menuClicked = id;
  }

  selectMenu(id:number,categorieId:any){
    //On supprime la classe selected
    let nb = document.getElementById("content"+categorieId).children.length;

    for(let i=1; i<=nb; i++){
      console.log("menu"+categorieId+""+i);
      document.getElementById("menu"+categorieId+""+i).removeAttribute("class");
    }

    document.getElementById("menu"+categorieId+""+id).setAttribute("class","selected");
  }

  onResize(event){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 700){
      if(document.getElementById("subMenu")) document.getElementById("subMenu").style.display = "none";
      document.getElementById("subtopnav").style.display = "none";
      document.getElementById("subtopnavMobile").style.display = "block";
    }else{
      if(document.getElementById("subMenu")) document.getElementById("subMenu").style.display = "inherit";
      document.getElementById("subtopnav").style.display = "inherit";
      document.getElementById("subtopnavMobile").style.display = "none";
    }
  }

}
