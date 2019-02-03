import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public faqs:any = null;
  public editerFAQs:boolean = false;
  public faqPlaceSave: any = [];

  public maxPlace: string = "0";

  public addFormIsActive: boolean = false;

  public titreToAdd: string = "Titre...";
  public descriptionToAdd: string = "Description...";
  public isvisibleToAdd: string = "1";
  public placeToAdd: string = "";

  constructor(public sanitizer: DomSanitizer, public utils: UtilsService) {
    this.faqs = this.utils.getAllFAQ(this);
  }

  ngOnInit() {}

  initParamsAddForm(){
    this.addFormIsActive = false;
    this.titreToAdd = "Titre...";
    this.isvisibleToAdd = "1";
    this.placeToAdd = ""+(parseInt(this.maxPlace)+1);
    this.descriptionToAdd = "Description...";
  }

  ngAfterViewInit(){
    this.utils.fixBottom();
  }

  editFAQs(){
    this.verifyPlaceAndCopy();
    if(this.editerFAQs == true){
      this.editerFAQs = false;
    }else{
      this.editerFAQs = true;
    }
  }

  verifyPlaceAndCopy(){
    for(let i = 0; i < this.faqs.records.length; i++){
      this.faqPlaceSave[i] = this.faqs.records[i].place;
      if(parseInt(this.faqs.records[i].place) > parseInt(this.maxPlace)) this.maxPlace = this.faqs.records[i].place;
    }
    this.placeToAdd = ""+(parseInt(this.maxPlace)+1);
  }
  
  view(){
    console.log(this.faqs);
    debugger;
    return true;
  }

  addFormFAQ(){
    if(this.addFormIsActive == false){
      this.addFormIsActive = true;
    }else{
      this.addFormIsActive = false;
    }
  }

  addFAQ(){
    let faq:any = {};
    faq.titre = this.titreToAdd;
    faq.isvisible = this.isvisibleToAdd;
    faq.place = this.placeToAdd;
    faq.description = this.descriptionToAdd;
    this.utils.addFAQ(faq);
  }

  deleteFAQ(id){
    if(parseInt(id) > 0){
      var confirmation = confirm("Etes vous sur de vouloir supprimer cette FAQ ? (id = "+id+")");
      if(confirmation == true) this.utils.deleteFAQ(id);
    }else{
      alert("Suppression impossible !");
    }
  } 

  updateFAQs(){
    this.utils.updateFAQ(this.faqs.records);
  }









  setTitre(faq:any,event:any){
    faq.titre = event.currentTarget.value;
  }

  changeDescription(faq:any,event:any){
    faq.description = event.currentTarget.value;
  }

  isVisible(faq:any){
    if(faq.isvisible == '1'){
      faq.isvisible = '0';
    }else{
      faq.isvisible = '1';
    }
  }

  setPlace(faq,event){
    let tmp = null;
    for(let i = 0; i < this.faqs.records.length; i++){
      if(this.isMissingValue(this.faqPlaceSave[i])) tmp = this.faqPlaceSave[i];
    }
    this.setMissingValue(tmp,faq);
    this.verifyPlaceAndCopy();
  }

  isMissingValue(value:string){
    for(let i = 0; i < this.faqs.records.length; i++){
      if(this.faqs.records[i].place == value) return false;
    }
    console.log("missingvalue = " +value);
    return true;
  }

  setMissingValue(oldValue:string,faq:any){
    for(let i = 0; i < this.faqs.records.length; i++){
      if(faq.id !== this.faqs.records[i].id && this.faqs.records[i].place == faq.place) console.log(this.faqs.records[i].place+ " = " +oldValue);
      if(faq.id !== this.faqs.records[i].id && this.faqs.records[i].place == faq.place) this.faqs.records[i].place = oldValue;
    }
  }

  setTitreToAdd(event){
    this.titreToAdd = event.currentTarget.value;
  }

  changeDescriptionToAdd(event){
    this.descriptionToAdd = event.currentTarget.value;
  }

  isVisibleToAddF(){
    if(this.isvisibleToAdd == '1'){
      this.isvisibleToAdd = '0';
    }else{
      this.isvisibleToAdd = '1';
    }
  }

  sanitizeTextAreaP(txt){
    return this.sanitizer.sanitize(txt,true);
  }



}
