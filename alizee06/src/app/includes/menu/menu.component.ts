import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public subMenuVisage:boolean = false;
  public subMenuCorps:boolean = false;

  constructor() { }

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

}
