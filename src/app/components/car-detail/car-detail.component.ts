import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';




@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:Car;
  carImages:CarImage[]=[];
  dataLoaded=false
  url:string = "https://localhost:44326/images/"


  constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute, private carImagesService:CarImagesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetail(params["carId"])
        this.getImagesById(params["carId"])
      }
    })
  }

  getCarDetail(carId:number){
    this.carDetailService.getCarDetail(carId).subscribe(response =>{

      this.carDetails=response.data[0];
      this.dataLoaded=true
      console.log(response)
    })
  }

  getImagesById(carId:number){
    this.carImagesService.getCarImagesById(carId).subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }  
}
