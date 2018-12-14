import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private utils: UtilsService) {
    
  }

  ngOnInit() {

    //this.utils.getAllProduits();
    //this.utils.getAllTarifs();
    
  }

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
