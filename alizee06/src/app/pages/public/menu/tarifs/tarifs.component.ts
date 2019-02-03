import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {MatSort, MatTableDataSource} from '@angular/material';

import { UtilsService } from '../../../../services/utils.service';

export interface Tarifs {
  id: string;
  description: string;
  prix: number;
  periode: string;
  promotion: string;
  place: string;
  delete: string;
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
  public tarifs:any = null;

  public editerTarifs: boolean = false;
  public addFormIsActive: boolean = false;

  public placeToAdd: string = "0";
  public descriptionToAdd: string = "Description...";
  public periodeToAdd: string = "-";
  public prixToAdd: string = "0.00";
  public promotionToAdd: string = "-";

  public tarifsPlaceSave: any = [];

  displayedColumns: string[] = ['description', 'prix', 'periode', 'promotion'];
  displayedColumnsEdit: string[] = ['place', 'description', 'prix', 'periode', 'promotion', 'delete'];
  public dataSource = null;

  constructor(public utils: UtilsService) {
    this.tarifs = this.utils.getAllTarifs(this);
    this.dataSource =  new MatTableDataSource(ELEMENT_DATA);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  generateArray(){
    ELEMENT_DATA.splice(0,ELEMENT_DATA.length);
    let i = 0;
    for(i = 0; i < this.tarifs.length; i++){
      if(parseInt(this.tarifs[i].place) > parseInt(this.placeToAdd)) this.placeToAdd = ""+(parseInt(this.tarifs[i].place));
      ELEMENT_DATA.push({id: this.tarifs[i].id, description: this.tarifs[i].description, prix: this.tarifs[i].prix, periode: this.tarifs[i].periode, promotion: this.tarifs[i].promotion, place: this.tarifs[i].place, delete: ''});
    }
    if(i>0){
      return true;
    } 
    return false;
  }

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

  editTarifs(){
    this.verifyPlaceAndCopy();
    if(this.editerTarifs == true){
      this.editerTarifs = false;
    }else{
      this.editerTarifs = true;
    }
  }

  verifyPlaceAndCopy(){
    for(let i = 0; i < this.tarifs.length; i++){
      this.tarifsPlaceSave[i] = this.tarifs[i].place;
    }
    if(this.editerTarifs == false){
      //On trie lke tableau par place
      //On les classe par place
      for(let i = 0; i < this.tarifs.length; i++){
        for(let j = 0; j < this.tarifs.length; j++){
          if(parseInt(this.tarifs[i].place) < parseInt(this.tarifs[j].place)){
            let tmp = this.tarifs[i];
            this.tarifs[i] = this.tarifs[j]
            this.tarifs[j] = tmp;
          }
        }
      }
      this.generateArray();
      this.dataSource._updateChangeSubscription();
    }
 }

  setPlace(element,event){
    this.setPlaceValue(element,event.value);
    let tmp = null;
    for(let i = 0; i < this.tarifs.length; i++){
      if(this.isMissingValue(this.tarifsPlaceSave[i])) tmp = this.tarifsPlaceSave[i];
    }
    this.setMissingValue(tmp,element);
    this.generateArray();
    this.dataSource._updateChangeSubscription();
    this.verifyPlaceAndCopy();
  }

  setPlaceValue(element,value){
    for(let i = 0; i < this.tarifs.length; i++){
      if(this.tarifs[i].id == element.id) this.tarifs[i].place = value;
    }
  }

  isMissingValue(value:string){
    for(let i = 0; i < this.tarifs.length; i++){
      if(this.tarifs[i].place == value) return false;
    }
    console.log("missingvalue = " +value);
    return true;
  }

  setMissingValue(oldValue:string,tarif:any){
    for(let i = 0; i < this.tarifs.length; i++){
      if(tarif.id !== this.tarifs[i].id && this.tarifs[i].place == tarif.place) console.log(this.tarifs[i].place+ " = " +oldValue);
      if(tarif.id !== this.tarifs[i].id && this.tarifs[i].place == tarif.place) this.tarifs[i].place = oldValue;
    }
  }

  setPrix(element,event){
    element.prix = event.currentTarget.value;
    this.setValue(element);
  }

  setPeriode(element,event){
    element.periode = event.currentTarget.value;
    this.setValue(element);
  }

  setPromotion(element,event){
    element.promotion = event.currentTarget.value;
    this.setValue(element);
  }

  changeDescription(element:any,event:any){
    element.description = event.currentTarget.value;
    this.setValue(element);
  }

  setValue(element:any){
    for(let i = 0; i < this.tarifs.length; i++){
      if(element.id == this.tarifs[i].id){
        this.tarifs[i].periode = element.periode;
        this.tarifs[i].promotion = element.promotion;
        this.tarifs[i].prix = element.prix;
        this.tarifs[i].description = element.description;
      }
    }
  }


  addTarif(){
    let tarif:any = {};
    tarif.promotion = this.promotionToAdd;
    tarif.periode = this.periodeToAdd;
    tarif.prix = this.prixToAdd;
    tarif.place = this.placeToAdd;
    tarif.description = this.descriptionToAdd;
    this.utils.addTarif(tarif);
  }

  updateTarifs(){
    this.utils.updateTarif(this.tarifs);
  }

  deleteTarif(element){
    if(parseInt(element.id) > 0){
      var confirmation = confirm("Etes vous sur de vouloir supprimer ce Tarif ? (description = "+element.description+")");
      if(confirmation == true) this.utils.deleteTarif(element.id);
    }else{
      alert("Suppression impossible !");
    }
  } 


  initParamsAddForm(){
    this.addFormIsActive = false;
    this.prixToAdd = "0.00";
    this.promotionToAdd = "-";
    this.periodeToAdd = "-";
    this.descriptionToAdd = "Description...";
    this.placeToAdd = ""+(parseInt(this.placeToAdd)-1);
  }

  addFormTarif(){
    if(this.addFormIsActive == false){
      this.addFormIsActive = true;
      this.placeToAdd = ""+(parseInt(this.placeToAdd)+1);
    }else{
      this.addFormIsActive = false;
      this.placeToAdd = ""+(parseInt(this.placeToAdd)-1);
    }
  }


  changeDescriptionToAdd(event){
    this.descriptionToAdd = event.currentTarget.value;
  }

  setPrixToAdd(event){
    let str = event.currentTarget.value;
    str = str.replace(",",".");
    if(!isNaN(Number(str))){
      this.prixToAdd = str;
    }else{
      alert("Le prix doit être un nombre! exemple: 99.99 ou 99,99");
    }

  }

  setPeriodeToAdd(event){
    this.periodeToAdd = event.currentTarget.value;
  }

  setPromotionToAdd(event){
    this.promotionToAdd = event.currentTarget.value;
  }

}
