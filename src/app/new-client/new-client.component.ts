import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../services/clients.service";
import {Client, Role} from "../model/client.model";
import {Router} from "@angular/router";
import {Operation} from "../model/compte.model";

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  newClientFormGrop! : FormGroup;


  constructor(private fb:FormBuilder,private clientService :ClientsService ,private route:Router) { }

  ngOnInit(): void {
    let rol: Role[] = [{ role: "USER" }];

    let r:Role[]=[];
    this.newClientFormGrop=this.fb.group({
      name  :this.fb.control(null,[Validators.minLength(4),Validators.required]),
      email : this.fb.control(null, [Validators.required,Validators.email]),
      password :this.fb.control(null,[Validators.minLength(4),Validators.required]),
      role: this.fb.control(rol)
    })
  }

  handleSaveClient() {
    let client: Client = this.newClientFormGrop.value;
    this.clientService.addClient(client).subscribe({
      next : data=>{
        alert("Le client a bien etait enregistrer !")
        //this.newClientFormGrop.reset();
        this.route.navigateByUrl("/clients");
      },
      error : err=>{
        console.log(err);
      }
      }
    );
  }
}
