import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {ComptesComponent} from "./comptes/comptes.component";
import {NewClientComponent} from "./new-client/new-client.component";
import {ComptesClientsComponent} from "./comptes-clients/comptes-clients.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AuthorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [
  {path:"login" ,component :LoginComponent},
  {path:"",redirectTo : "/login",pathMatch:"full"},
  {path:"admin", component : AdminTemplateComponent ,canActivate:[AuthenticationGuard],
    children :[
      {path:"comptes",component : ComptesComponent},
      {path:"clients",component:ClientsComponent},
      {path:"new-client",component : NewClientComponent ,canActivate:[AuthorizationGuard], data :{role:"ROLE_ADMINgit"}},
      {path:"comptes-clients/:id",component :ComptesClientsComponent},
      {path:"notAuthorized",component:NotAuthorizedComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
