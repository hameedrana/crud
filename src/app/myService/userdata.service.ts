import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  postData(data:any){
    return this.http.post<any>("http://localhost:3000/userData/",data)
  }
  getData(){
    return this.http.get<any>("http://localhost:3000/userData/")
  }
  putData(data:any, id:number){
   return this.http.put<any>("http://localhost:3000/userData/"+id,data)
  }
  deleteData(id:number){
    return this.http.delete<any>("http://localhost:3000/userData/"+id)
   }
}
