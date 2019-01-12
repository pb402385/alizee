import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

import { UtilsService } from '../../../../services/utils.service';

export interface Tarifs {
  title: string;
  description: string;
  price: number;
}

/*
const ELEMENT_DATA: Tarifs[] = [
  {title: "Produit 1 (SV)", description: 'Twinslim radiofréquence', price: 100.00},
  {title: "Produit 2 (SV)", description: 'Dervabrasion', price: 90.00},
  {title: "Produit 3 (SV)", description: 'Micro-needling', price: 110.00},
  {title: "Produit 4 (SV)", description: 'Mésolift', price: 80.00},
  {title: "Produit 5 (SV)", description: 'Injections Acide hyaluonique', price: 50.00},
  {title: "Produit 6 (SV)", description: 'Peeling', price: 150.00},
  {title: "Produit 7 (SV)", description: 'Miltathérapie', price: 140.00},
  {title: "Produit 8 (SC)", description: 'Twinslim cavitation', price: 100.00},
  {title: "Produit 9 (SC)", description: 'Twinslim radiofréquence', price: 110.00},
  {title: "Produit 10 (SC)", description: 'Cryolipolyse', price: 70.00},
  {title: "Produit 11 (SC)", description: 'Onde de choc', price: 85.00},
  {title: "Produit 12 (SC)", description: 'Miltathérapie', price: 110.00},
  {title: "Produit 13", description: '...', price: null}
];
*/

const ELEMENT_DATA: Tarifs[] = [];

@Component({
  selector: 'app-tarifs',
  templateUrl: './tarifs.component.html',
  styleUrls: ['./tarifs.component.css']
})
export class TarifsComponent implements OnInit {

  constructor(public utils: UtilsService) {
  }

  displayedColumns: string[] = ['title', 'description', 'price'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

}
