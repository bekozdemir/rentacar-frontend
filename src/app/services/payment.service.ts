import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentItems } from '../models/rentItems';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiURL='https://localhost:44326/api/'

  constructor(private httpClient:HttpClient) { }

  pay(rentItems:RentItems, amount:Number):Observable<ResponseModel>{
    let newPath = this.apiURL + "rentals/paymentadd"
    //rentItems.returnDate = null
    return this.httpClient.post<ResponseModel>(newPath, {payment:{amount:amount},rental:{rentItems:rentItems}})
    
  }

}
