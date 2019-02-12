import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

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
