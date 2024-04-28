import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated : boolean =false;
  roles : any ;
  name !:any
  username :any;
  accessToken!:any;
  idCompteCC !:any ;

  constructor( private http :HttpClient,private router:Router) { }
  public login(username: string,password:string){
    let options ={
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params =new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8085/auth/login",params,options)
  }

  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken  =data['access=token'];
    this.name =data['name'];
    console.log('yes');
    console.log(this.accessToken);
    let decodedJwt:any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    this.idCompteCC=data['idcompt'];
    console.log(this.idCompteCC);
    window.localStorage.setItem("jwt-token",this.accessToken);
    window.localStorage.setItem("idcompt",this.idCompteCC);
    window.localStorage.setItem("name",this.name);


  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token");
    window.localStorage.removeItem("idcompt");
    window.localStorage.removeItem("name");
    this.router.navigateByUrl("/login");
    this.idCompteCC=undefined;

  }

  loadJwtTokenFromLocalStorage() {
    let token =window.localStorage.getItem("jwt-token");
    let idCompt=window.localStorage.getItem("idcompt");
    let name=window.localStorage.getItem("name");
    if (token){
      this.loadProfile({"access=token":token,"idcompt":idCompt,"name":name});
      this.router.navigateByUrl("/admin/home");
    }
  }
}
