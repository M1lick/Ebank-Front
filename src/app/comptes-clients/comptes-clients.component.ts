import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../model/client.model";

@Component({
  selector: 'app-comptes-clients',
  templateUrl: './comptes-clients.component.html',
  styleUrls: ['./comptes-clients.component.css']
})
export class ComptesClientsComponent implements OnInit {
 idClient! : String;
 client! : Client
  constructor( private route :ActivatedRoute,private  router :Router) {
    this.client=this.router.getCurrentNavigation()?.extras.state as Client;
  }

  ngOnInit(): void {
    this.idClient=this.route.snapshot.params["id"]
  }

}
