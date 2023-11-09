import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://localhost:4100/"
  constructor(private http:HttpClient) { }

  postUser(data:any){
    return this.http.post(this.url + "add_user",data)
  }

  getUser(){
    return this.http.get(this.url + "get_user")
  }

  updateUser(data:any,id:number){
    return this.http.put(this.url + "update_user",data)
  }

  deleteUser(id:number){
    return this.http.delete(this.url + "delete_user/"+id)
  }

}
