import { Component, OnInit, Input, NgZone } from '@angular/core';

import {Observable} from "rxjs/Observable";

import { DomSanitizer } from '@angular/platform-browser';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  @Input() produit: any;
  public description_p: any = "";
  public image_p: any = null;
  public image_s: any = null;

  public imageToShow: any = "";

  public edit: boolean = false;
  public produitIsVisible: boolean = null;

  public selectedValue: number = null;

  constructor(private zone: NgZone, 
              public sanitizer: DomSanitizer, 
              private utils: UtilsService) {

  }

  ngOnInit() {
    this.description_p = "";
    this.image_p = null;
    this.image_s = null;

    this.selectedValue = parseInt(this.produit.id_template);

    if(this.produit.isvisible == 1){
      this.produitIsVisible = true;
    }else{
      this.produitIsVisible = false;
    };

    this.utils.errorLog401 = null;
    this.utils.successLog = null;

    if(this.produit.image_p == null) this.produit.image_p = "";

    //On crée un contenu HTML secure
    this.description_p = this.sanitizer.bypassSecurityTrustHtml(this.produit.description_p);
    this.image_p = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+this.produit.image_p);
    this.image_s = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+this.produit.image_s);
  }

  ngOnChanges(){
    this.description_p = "";
    this.image_p = null;
    this.image_s = null;

    this.selectedValue = parseInt(this.produit.id_template);

    if(this.produit.isvisible == 1){
      this.produitIsVisible = true;
    }else{
      this.produitIsVisible = false;
    };

    this.utils.errorLog401 = null;
    this.utils.successLog = null;

    //On crée un contenu HTML secure
    this.description_p = this.sanitizer.bypassSecurityTrustHtml(this.produit.description_p);
    this.image_p = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+this.produit.image_p);
    this.image_s = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+this.produit.image_s);
  }

  editProduit(){
    if(this.edit == false){
      this.edit = true;
    }else{
      this.edit = false;
    }
  }

  isVisible(){
    if(this.produitIsVisible){
      this.produitIsVisible = false;
      this.produit.isvisible = 0;
    }else{
      this.produitIsVisible = true;
      this.produit.isvisible = 1;
    };
    console.log(this.produit.isvisible);
  }





  /**
   * Produit Setters
   */

  setNom(produit:any,event:any){
    this.produit.nom = event.currentTarget.value;
  }

  setTemplate(produit:any,event:any){
    this.produit.id_template = ''+event.value;
    this.selectedValue = event.value;
  }

  loadFileP(produit:any,event:any){
    let url =  URL.createObjectURL(event.target.files[0]);
    this.getBase64asyncCall(event.target.files[0],"p");
    this.image_p = this.sanitizer.bypassSecurityTrustUrl(url);
    let el: HTMLImageElement = <HTMLImageElement>document.getElementById('imagePreviewP');
    this.zone.runOutsideAngular(() => {
      el.src = url;
    });
  }

  loadFileS(produit:any,event:any){
    let url =  URL.createObjectURL(event.target.files[0]);
    this.getBase64asyncCall(event.target.files[0],"s");
    this.image_s = this.sanitizer.bypassSecurityTrustUrl(url);
    let el: HTMLImageElement = <HTMLImageElement>document.getElementById('imagePreviewS');
    this.zone.runOutsideAngular(() => {
      el.src = url;
    });
  }

  changeDescriptionP(produit:any,event:any){
    this.produit.description_p = event.currentTarget.value;
    this.description_p = this.produit.description_p;
  }

  sanitizeTextAreaP(txt){
    return this.sanitizer.sanitize(txt,true);
  }









  updateProduit(produit:any){
    this.utils.updateProduit(produit);
  }






  getBase64(file,num):any {
    var classe = this;
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }).then(function(value:string) {
      if(num == "p") classe.produit.image_p = value.split(",")[1];
      if(num == "s") classe.produit.image_s = value.split(",")[1];
    });
  }

  getBase64asyncCall(file,num) {
    Promise.resolve(this.getBase64(file,num));
  }


}
