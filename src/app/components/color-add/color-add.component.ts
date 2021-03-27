import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup
  colorUpdateForm: FormGroup
  constructor(private toastrService:ToastrService, private formBuilder:FormBuilder, private colorService:ColorService, private router:Router) { }

  ngOnInit(): void {
    this.createColorAddForm()
    this.createColorUpdateForm()
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["", Validators.required]
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["", Validators.required],
      colorName:["", Validators.required]
    })
  }

  add(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message, "İşlem başarılı!")
      },responseError =>{
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
   
    if (this.colorUpdateForm.valid) {
      let colorUpdateModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.update(colorUpdateModel).subscribe(response => {
        this.toastrService.success(response.message, "İşlem başarılı!")
      },responseError =>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          } 
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }
    this.router.navigateByUrl('/').then(() => {this.router.navigate(["colors/color-list"])})
  }
}
