import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public subMenuVisage:boolean = false;
  public subMenuCorps:boolean = false;

  public categories:any = null;
  public produits:any = null;
  public sortedProducts: any = null;

  public screenWidth:number = screen.width;

  public menuClicked:number = 0;


  constructor(private utils: UtilsService) { 
    this.utils.getInfoForMenu(this);
  }

  ngOnInit() {
  }


  activeMenuResponsive() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }

  activeMenuTitle(id:number) {
    let menuLength = document.getElementById("myTopnav").children.length - 3;
    menuLength = menuLength + document.getElementById("subtopnav").children.length;
    for(let i=0; i<menuLength; i++){
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

}
