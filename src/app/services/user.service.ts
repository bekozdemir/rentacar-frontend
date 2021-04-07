import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'https://localhost:44326/api/userauths/';

  constructor(private httpClient:HttpClient) { }

  update(user:User){
    let newPath=this.apiURL + "update";
    return this.httpClient.post<ResponseModel>(newPath,{
      user:{
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email, 
      },
      password:user.password
    })
  }

  getUser(email:string){
    let newPath=this.apiURL + "getbyemail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  getById(userId:number){
    let newPath = this.apiURL + "getbyid?userAuthId=" + userId;
    return this.httpClient.get<SingleResponseModel<RegisterModel>>(newPath)

  }
}
