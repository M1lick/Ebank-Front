import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CompteDetails} from "../model/compte.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComptesService {

  constructor(private http: HttpClient) { }

  public getComptes(compteId: string,page:number,size:number):Observable<CompteDetails>{
    return  this.http.get<CompteDetails>(environment.backEndHost+"/comptes/"+compteId+"/pageOperations?page="+page+"&size="+size);

  }
  public retrait(compteId: string,montant:number,description:string){
    let data={compteId:compteId,montant:montant,description:description};
    return  this.http.post(environment.backEndHost+"/comptes/retrait",data);

  }
  public depot(compteId: string,montant:number,description:string){
    let data={compteId,montant,description};
    return  this.http.post(environment.backEndHost+"/comptes/depot",data);

  }
  public transfer(compteSource: string,compteDestination: string,montant:number,description:string){
    let data={compteSource,compteDestination,montant,description};
    return  this.http.post(environment.backEndHost+"/comptes/transfer",data);

  }

}
