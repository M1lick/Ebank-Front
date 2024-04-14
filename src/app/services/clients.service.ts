import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../model/client.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http:HttpClient){}
    public getClients():Observable<Array<Client>>{
      return this.http.get<Array<Client>>(environment.backEndHost+"/clients");
    }
  public searchClients(keyword : string):Observable<Array<Client>>{
    return this.http.get<Array<Client>>
    (environment.backEndHost+"/clients/search?keyword="+keyword);
  }
  public addClient(client : Client):Observable<Client>{
    return this.http.post<Client>
    (environment.backEndHost+"/clients",client);
  }
  public deleteClient(id : number){
    return this.http.delete
    (environment.backEndHost+"/clients/"+id);
  }

  }

