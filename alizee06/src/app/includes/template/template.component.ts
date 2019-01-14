import { Component, OnInit, Input, NgZone } from '@angular/core';

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

  constructor(private zone: NgZone, 
              public sanitizer: DomSanitizer, 
              private utils: UtilsService) {

  }

  ngOnInit() {
    this.description_p = "";
    this.image_p = null;
    this.image_s = null;

    if(this.produit.isvisible == 1){
      this.produitIsVisible = true;
    }else{
      this.produitIsVisible = false;
    };

    //On crée un contenu HTML secure
    this.description_p = this.sanitizer.bypassSecurityTrustHtml(this.produit.description_p);
    this.image_p = 'data:image/bmp;base64,'+this.produit.image_p;
    this.image_s = 'data:image/bmp;base64,'+this.produit.image_s;
  }

  ngOnChanges(){
    this.description_p = "";
    this.image_p = null;
    this.image_s = null;

    if(this.produit.isvisible == 1){
      this.produitIsVisible = true;
    }else{
      this.produitIsVisible = false;
    };

    //On crée un contenu HTML secure
    this.description_p = this.sanitizer.bypassSecurityTrustHtml(this.produit.description_p);
    this.image_p = 'data:image/bmp;base64,'+this.produit.image_p;
    this.image_s = 'data:image/bmp;base64,'+this.produit.image_s;
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

  loadFileP(produit:any,event:any){
    this.produit.imagep = URL.createObjectURL(event.target.files[0]);
    this.image_p = this.sanitizer.bypassSecurityTrustUrl(this.produit.imagep);
    let el: HTMLImageElement = <HTMLImageElement>document.getElementById('imagePreviewP');
    this.zone.runOutsideAngular(() => {
      el.src = URL.createObjectURL(event.target.files[0]);
    });
  }

  changeDescriptionP(produit:any,event:any){
    this.produit.description_p = event.currentTarget.value;
    this.description_p = this.produit.description_p;
  }

  sanitizeTextAreaP(txt){
    return this.sanitizer.sanitize(txt,true);
  }

}
