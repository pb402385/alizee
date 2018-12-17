import { Component, OnInit, Input } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.description_p = "";
    this.image_p = null;
    this.image_s = null;

    //On crée un contenu HTML secure
    this.description_p = this.sanitizer.bypassSecurityTrustHtml(this.produit.description_p);
    this.image_p = 'data:image/bmp;base64,'+this.produit.image_p;
    this.image_s = 'data:image/bmp;base64,'+this.produit.image_s;
  }

  ngOnChanges(){
    this.description_p = "";
    this.image_p = null;
    this.image_s = null;

    //On crée un contenu HTML secure
    this.description_p = this.sanitizer.bypassSecurityTrustHtml(this.produit.description_p);
    this.image_p = 'data:image/bmp;base64,'+this.produit.image_p;
    this.image_s = 'data:image/bmp;base64,'+this.produit.image_s;
  }

}
