import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {

  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getAllByCarId?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
