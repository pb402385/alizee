import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  constructor() { }

  /**
     *  Méthode de gestion des erreurs
     * @param error l'erreur retournée par le server
     * @param urlWebService le web service d'où provient l'erreur
     * @param classe la classe appelante
     */
    errorManagement(error:any,urlWebService:string,classe:any):void{
      console.log(error);
      console.log(urlWebService);
      console.log(classe);
    }
}
