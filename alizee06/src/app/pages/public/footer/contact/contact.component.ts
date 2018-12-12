import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private utils: UtilsService) {

  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
