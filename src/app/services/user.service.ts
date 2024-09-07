import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
http = inject(HttpClient);
baseUrl ="https://localhost:44369/api/banner/"
  constructor() { }
  getAllEmp(){
    return this.http.get<any>(this.baseUrl+"getall?pageNumber=1&size=10");
   }

  getAllUser(){
    return this.http.get<any>(this.baseUrl+"getall");
   
  }
  getUser(id:string){
    return this.http.get<any>(this.baseUrl+"getbyid/"+id);
  }
  createUser(data:IUser){
    return this.http.post(this.baseUrl+"add",data);
  }
  updateUser(id:string,data:IUser){
    return this.http.put( this.baseUrl+"update/"+id,data);
  }
  deleteUser(id:string){
    return this.http.delete(this.baseUrl+"delete/"+id);
  }
}
