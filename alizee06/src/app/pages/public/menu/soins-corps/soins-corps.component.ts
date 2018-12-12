import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-soins-corps',
  templateUrl: './soins-corps.component.html',
  styleUrls: ['./soins-corps.component.css']
})
export class SoinsCorpsComponent implements OnInit {

  public subMenuCorps:boolean = true; 

  public menuScClicked:number = 0;

  constructor(private utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

  setMenuSc(id:number){
    this.selectMenu(id);
    this.menuScClicked = id;
  }

  selectMenu(id:number){
    //On supprime la classe selected
    let nb = document.getElementById("subMenu").children.length;

    for(let i=1; i<=nb; i++){
      document.getElementById("menuSc"+i).removeAttribute("class");
    }

    document.getElementById("menuSc"+id).setAttribute("class","selected");
  }

}
