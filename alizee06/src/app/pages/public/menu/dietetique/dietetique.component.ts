import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-dietetique',
  templateUrl: './dietetique.component.html',
  styleUrls: ['./dietetique.component.css']
})
export class DietetiqueComponent implements OnInit {

  constructor(public utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
