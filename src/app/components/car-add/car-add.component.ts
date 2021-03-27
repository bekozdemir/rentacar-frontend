import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  carUpdateForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.createCarUpdateForm();
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
