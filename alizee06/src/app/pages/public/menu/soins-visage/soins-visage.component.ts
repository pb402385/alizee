import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-soins-visage',
  templateUrl: './soins-visage.component.html',
  styleUrls: ['./soins-visage.component.css']
})
export class SoinsVisageComponent implements OnInit {

  constructor(private utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
