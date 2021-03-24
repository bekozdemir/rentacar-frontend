import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiURL= 'https://localhost:44326/api/'

  constructor(private httpClient:HttpClient) { }

  getCarDetail(carId:Number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiURL +"cars/getcardetailsbycarid?carId="+ carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
