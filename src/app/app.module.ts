import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';


import { ToastrModule } from 'ngx-toastr';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { RentComponent } from './components/rent/rent.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { NaviAuthComponent } from './components/navi-auth/navi-auth.component';
import { ProfileComponent } from './components/profile/profile.component';





@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    NaviComponent,
    RentalsComponent,
    CarDetailComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterPipe,
    CarFilterComponent,
    RentComponent,
    PaymentComponent,
    CarAddComponent,
    ColorListComponent,
    ColorAddComponent,
    BrandAddComponent,
    BrandListComponent,
    LoginComponent,
    RegisterComponent,
    NaviAuthComponent,
    ProfileComponent,

  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token")
        }
      }
    }),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
