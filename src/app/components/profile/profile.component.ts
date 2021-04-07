import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userUpdateForm: FormGroup
  users:User[]
  constructor(
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private userService:UserService,
    public authService:AuthService,
    
    ) { }

  ngOnInit(): void {
    if (this.isAuth()) {
      this.authService.userDetailFromToken();
      this.createUserUpdateForm();
      this.userUpdateForm.patchValue({
        id:this.authService.userId,
        firstName: this.authService.name,
        lastName: this.authService.surname,
        email: this.authService.email
      })
    }
    

    
  }

  

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  update(){
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response => {
        this.toastrService.info(response.message)
        this.router.navigate(["/profile"])
      }, responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası!")
            
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik", "Dikkat!")
    }  
  }

  isAuth(){
    if (this.authService.isAuthenticated()) {
      return true
    }else{
      return false
    }
  }
}
