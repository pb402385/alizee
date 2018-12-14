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

  constructor(private utils: UtilsService) { 
    this.utils.getAllCategories(this);
    this.utils.getAllProduitsSimple(this);
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
    let menuLength = document.getElementById("myTopnav").children.length - 1;
    for(let i=1; i<menuLength; i++){
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

}
