import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientsService} from "../services/clients.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Client} from "../model/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
clients!: Observable<Array<Client>>;
errorMessage! : string;
searchFormGroup : FormGroup | undefined ;
  constructor(private clientServices :ClientsService ,private fb :FormBuilder ,private router :Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control("")
    })
  this.handleChearcheClient();
  }

  handleChearcheClient() {
let kw=this.searchFormGroup?.value.keyword;
this.clients=this.clientServices.searchClients(kw)
  .pipe(catchError(
        err =>{this.errorMessage=err.message;
          return throwError(err);
        } ));
  }

  handleDeleteClient(c: Client) {
    let conf = confirm("etes vous sur de vouloire supprimer le client "+ c.name);
    if(!conf)
      return;
    this.clientServices.deleteClient(c.id).subscribe({
      next : (resp)=>{
        this.clients=this.clients.pipe(
          map(data=>{
            let index= data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error :err => {
        console.log(err);
      }
    })
  }

  handleCompteCLient(client: Client) {
    this.router.navigateByUrl("comptes-clients/"+client.id ,{state:client});

  }
}
