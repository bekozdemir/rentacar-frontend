import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi-auth',
  templateUrl: './navi-auth.component.html',
  styleUrls: ['./navi-auth.component.css']
})
export class NaviAuthComponent implements OnInit {

  constructor(
    private toastrService:ToastrService,
    public authService:AuthService,

    ) { }

  ngOnInit(): void {
    this.isAuth();
    
  }

  isAuth(){
    if (this.authService.isAuthenticated()) {
      this.authService.userDetailFromToken();
    }
  }

  logOut(){
    this.authService.logout();
  }
}
