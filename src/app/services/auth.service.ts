import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  name:string
  surname:string
  email:string
  roles:any[];
  token:any;
  userId:number;

  apiURL = 'https://localhost:44326/api/auth/'
  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router,
    private jwtHelper:JwtHelperService
    ) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiURL + "login", loginModel)
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiURL+ "register", registerModel)
  }

  isAuthenticated(){
    if (this.localStorageService.getToken()) {
      return true
    }else{
      return false
    }
  }

  logout(){
    this.localStorageService.clean();
    this.toastrService.info("Çıkış yapıldı", "Çıkış başarrılı")
    setTimeout(function(){location.reload()},500)
    this.router.navigate(["/cars"]);
  }

  userDetailFromToken(){
    this.token = this.localStorageService.getToken()
    let decodedToken = this.jwtHelper.decodeToken(this.token)
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    this.name = name.split(' ')[0]
    let surname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    this.surname = surname.split(" ")[47]
    this.email = decodedToken['email']
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    
  //   console.log(this.name)
  //   console.log(this.surname)
  //   console.log("roles:"+this.roles)
  //   console.log("userId:"+this.userId)
  }
}
