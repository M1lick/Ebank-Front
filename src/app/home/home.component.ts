import { Component, OnInit } from '@angular/core';
import {ComptesService} from "../services/comptes.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {CompteDetails} from "../model/compte.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  compteFormGroup!: FormGroup;
  currentPage: number =0 ;
  pageSize: number=5;
  compteObservable! : Observable<CompteDetails>;
  operationFormGroup!: FormGroup;
  errorMessage: any;

  constructor(private  fb:FormBuilder,private compteService:ComptesService  ,public authService: AuthService) {  }


  ngOnInit(): void {
    this.handleSearchCompte()
    this.compteFormGroup=this.fb.group({
    });
    this.operationFormGroup=this.fb.group({
      typeOperation:this.fb.control(null),
      montant : this.fb.control(0),
      description: this.fb.control(null),
      compteDestination: this.fb.control(null)
    })

  }

  handleSearchCompte() {

    this.compteObservable=this.compteService.getComptes(this.authService.idCompteCC,this.currentPage,this.pageSize);

  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchCompte();

  }

  handleSearchCompteOpertion() {
    let  IdCompte :string =this.authService.idCompteCC;
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
