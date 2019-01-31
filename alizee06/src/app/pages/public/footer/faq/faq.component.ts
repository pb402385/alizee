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
  public isvisibleToAdd: string = "";
  public placeToAdd: string = "";

  constructor(public sanitizer: DomSanitizer, public utils: UtilsService) {
    this.faqs = this.utils.getAllFAQ(this);
  }

  ngOnInit() {}

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

  updateFAQs(){

  }

  addFormFAQ(){
    if(this.addFormIsActive == false){
      this.addFormIsActive = true;
    }else{
      this.addFormIsActive = false;
    }
  }

  addFAQ(){

  }









  setTitre(faq:any,event:any){
    faq.titre = event.currentTarget.value;
  }

  changeDescription(faq:any,event:any){
    faq.description = event.currentTarget.value;
  }

  setTitreToAdd(event){
    this.titreToAdd = event.currentTarget.value;
  }

  changeDescriptionToAdd(event){
    this.descriptionToAdd = event.currentTarget.value;
  }

  sanitizeTextAreaP(txt){
    return this.sanitizer.sanitize(txt,true);
  }



}
