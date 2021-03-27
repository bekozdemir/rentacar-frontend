import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiURL = 'https://localhost:44326/api/'

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiURL + "cars/getcarsdetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiURL + "cars/getcarsbybrandid?brandid="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiURL + "cars/getcarsbycolorid?colorid="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrandAndColorId(brandId:number, colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiURL + "cars/getcarsbybrandandcolorid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiURL + "cars/add"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiURL + "cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
}
