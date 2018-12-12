import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public subMenuVisage:boolean = false;
  public subMenuCorps:boolean = false;

  public screenWidth:number = screen.width;

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

  openSubMenuSv(){
    let dropdownContent = document.getElementById("contentSv");
    let dropdownButton =  document.getElementById("menuBtnSv");
    if (dropdownContent.style.display === "block") {
      dropdownButton.removeAttribute("class");
      dropdownButton.setAttribute("class","dropdown-btn");
      dropdownContent.style.display = "none";
    } else {
      dropdownButton.setAttribute("class","dropdown-btn activeSub");
      dropdownContent.style.display = "block";
    }
  }

  openSubMenuSc(){
    let dropdownContent = document.getElementById("contentSc");
    let dropdownButton =  document.getElementById("menuBtnSc");
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
