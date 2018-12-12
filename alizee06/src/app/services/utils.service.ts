import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private zone: NgZone) { }


  fixBottom(){
    this.zone.runOutsideAngular(() => {
      setTimeout(function(){
        document.getElementById('footer').style.bottom = "inherit";

        var hd = document.body.offsetHeight;
        
        if(document.getElementById('footer') !== null){
          var footer = document.getElementById('footer').getBoundingClientRect();
          //On recupere la position y du footer
          var pf = footer.top;
          //On recupere la hauteur du footer
          var hf = footer.bottom - footer.top;
          //On fait un calcul magique
          
          console.log(hd+":"+(pf+hf));
          
          if(hd < pf+hf+1){
            document.getElementById('footer').style.bottom = 0+"px";
          }else{
            document.getElementById('footer').style.bottom = (pf+hf)-hd+"px";
          }

          //alert("changed hd="+hd+" pf+hf="+(pf+hf));
        }
      }, 100);
    });
  }

}
