import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.css']
})
export class HeaderResponsiveComponent implements OnInit {

  constructor() {
    if(localStorage.getItem('role') !== "ruby"){
      localStorage.setItem("role", "user");
    }
  }

  ngOnInit() {
  }

}
