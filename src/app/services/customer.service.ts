import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL = 'https://localhost:44326/api/'
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath =this.apiURL + "customers/getcustomerdetails"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
      
  }
}
