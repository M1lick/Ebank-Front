import {Operation} from "./compte.model";

export interface Client{
    id:number;
    name:string;
    email:string;
    password:string ;
  role: Role[];

}

export interface Role{
  role :string ;

}
