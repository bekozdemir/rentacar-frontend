import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup
  brandUpdateForm:FormGroup
  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createBrandAddForm()
    this.createBrandUpdateForm()
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["", Validators.required]
    }) 
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:["", Validators.required],
      brandName:["", Validators.required]
    })
  }

  add(){
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "İşlem başarılı")
      }, responseError => {
        console.log(responseError)
        if (responseError.error.ValidationErrors.length>0) {
          console.log(responseError.error.ValidationErrors)
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
    if (this.brandUpdateForm.valid) {
      let brandUpdateModel = Object.assign({}, this.brandUpdateForm.value)
      this.brandService.update(brandUpdateModel).subscribe(response => {
        this.toastrService.success(response.message, "İşlem başarılı")
      }, responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
    this.router.navigateByUrl('/').then(() => {this.router.navigate(["brands/brand-list"])})
  }
}
