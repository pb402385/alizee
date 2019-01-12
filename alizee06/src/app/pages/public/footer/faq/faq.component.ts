import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(public utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
