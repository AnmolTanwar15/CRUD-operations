import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postUser(data:any){
    return this.http.post("http://localhost:3000/posts",data)
  }

  getUser(){
    return this.http.get("http://localhost:3000/posts")
  }

  updateUser(data:any,id:number){
    return this.http.put("http://localhost:3000/posts/"+id,data)
  }

  deleteUser(id:number){
    return this.http.delete("http://localhost:3000/posts/"+id)
  }

}
