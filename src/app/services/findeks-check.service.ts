import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksCheckService {

  apiURL = 'https://localhost:44326/api/'

  constructor(private httpClient:HttpClient) { }

  findeksCheck(carId:number, customerId:number){
    let newPath = this.apiURL + "findekscheck/findekschecker?carId=" + carId + "&customerId=" + customerId;
    return this.httpClient.get<ResponseModel>(newPath)
  }
}
