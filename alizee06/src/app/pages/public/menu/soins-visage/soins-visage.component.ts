import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-soins-visage',
  templateUrl: './soins-visage.component.html',
  styleUrls: ['./soins-visage.component.css']
})
export class SoinsVisageComponent implements OnInit {
  
  public subMenuVisage:boolean = true;

  public menuSvClicked:number = 0;

  constructor(private utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

  setMenuSv(id:number){
    this.selectMenu(id);
    this.menuSvClicked = id;
  }

  selectMenu(id:number){
    //On supprime la classe selected
    let nb = document.getElementById("subMenu").children.length;

    for(let i=1; i<=nb; i++){
      document.getElementById("menuSv"+i).removeAttribute("class");
    }

    document.getElementById("menuSv"+id).setAttribute("class","selected");
  }

}
