import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ComptesService} from "../services/comptes.service";
import {Observable} from "rxjs";
import {CompteDetails} from "../model/compte.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
compteFormGroup!: FormGroup;
currentPage: number =0 ;
pageSize: number=5;
compteObservable! : Observable<CompteDetails>;
operationFormGroup!: FormGroup;
  constructor(private  fb:FormBuilder,private compteService:ComptesService  ,public authService: AuthService) { }

  ngOnInit(): void {
    this.compteFormGroup=this.fb.group({
      compteId : this.fb.control('')
    });
    this.operationFormGroup=this.fb.group({
      typeOperation:this.fb.control(null),
      montant : this.fb.control(0),
      description: this.fb.control(null),
      compteDestination: this.fb.control(null)
    })

  }

  handleSearchCompte() {
    let compteId= this.compteFormGroup.value.compteId;
    this.compteObservable=this.compteService.getComptes(compteId,this.currentPage,this.pageSize);

  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchCompte();

  }

  handleSearchCompteOpertion() {
    let  IdCompte :string =this.compteFormGroup.value.compteId;
    let typeOperation : string=this.operationFormGroup.value.typeOperation;
    let montant : number =this.operationFormGroup.value.montant;
    let description : string=this.operationFormGroup.value.description;
    let compteDestination : string =this.operationFormGroup.value.compteDestination;
    if (typeOperation=="RETRAIT"){
      this.compteService.retrait(IdCompte,montant,description).subscribe({
        next : (data)=> {
          alert("Retrait effectuer avec succer")
          this.operationFormGroup.reset();
          this.handleSearchCompte();
      },error:err=>{
          console.log(err);

        }
      })

    } else if (typeOperation=="DEPOT"){
      this.compteService.depot(IdCompte,montant,description).subscribe({
        next : (data)=> {
          alert("depot effectuer avec succer");
          this.operationFormGroup.reset();
          this.handleSearchCompte();
        },error:err=>{
          console.log(err);
        }
      })

    }    else if (typeOperation=="TRANSFER"){
      this.compteService.transfer(IdCompte,compteDestination,montant,description).subscribe({
        next : (data)=> {
          alert("transfer effectuer avec succer");
          this.operationFormGroup.reset();
          this.handleSearchCompte();
        },error:err=>{
          console.log(err);
        }
      })

    }

  }
}
