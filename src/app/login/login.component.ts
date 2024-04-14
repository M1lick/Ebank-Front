import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin! : FormGroup;

  constructor(private fb :FormBuilder,private autService:AuthService ,private routeur :Router) { }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username: this.fb.control(""),
      password:this.fb.control("")
    })
  }

  handleLogin() {
    let username=this.formLogin.value.username;
    let pwd=this.formLogin.value.password;
    this.autService.login(username,pwd).subscribe({
      next: data => {
        this.autService.loadProfile(data);
        this.routeur.navigateByUrl("/admin")
      },
      error: err => {console.log(err);}
    })

  }
}
