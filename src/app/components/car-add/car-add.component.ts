import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  
  cars:Car[]
  brands:Brand[]
  colors:Color[]
  carAddForm:FormGroup;
  carUpdateForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private carService:CarService, 
    private toastrService:ToastrService, 
    private router:Router,
    private brandService:BrandService,
    private colorService:ColorService,) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(response =>{
      this.cars = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      id:["", Validators.required],
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  add(){
    if (this.carAddForm.valid) {
     let carModel = Object.assign({}, this.carAddForm.value)
     this.carService.add(carModel).subscribe(response=> { 
       this.toastrService.success(response.message, "İşlem başarılı!")
     }, responseError=> {
       if (responseError.error.ValidationErrors.length>0) {
         for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
           this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
         }
       }
     }) 
    }else{
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    } 
    this.router.navigateByUrl('/').then(() => {this.router.navigate(["cars"])})
  }

  update(){
    if (this.carUpdateForm.valid) {
     let carUpdateModel = Object.assign({}, this.carUpdateForm.value)
     this.carService.update(carUpdateModel).subscribe(response=> { 
       this.toastrService.success(response.message, "İşlem başarılı!")
     }, responseError=> {
       if (responseError.error.ValidationErrors.length>0) {
         for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
           this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
         }
       }
     }) 
    }else{
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    } 
    this.router.navigateByUrl('/').then(() => {this.router.navigate(["cars"])})
  }
}
