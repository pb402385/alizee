import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-soins-corps',
  templateUrl: './soins-corps.component.html',
  styleUrls: ['./soins-corps.component.css']
})
export class SoinsCorpsComponent implements OnInit {

  constructor(private utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
