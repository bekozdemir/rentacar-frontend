import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';

import { ToastrModule } from 'ngx-toastr';
import { Browser } from 'selenium-webdriver';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { RentComponent } from './components/rent/rent.component';
import { PaymentComponent } from './components/payment/payment.component';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    NaviComponent,
    RentalsComponent,
    CarDetailComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterPipe,
    CarFilterComponent,
    RentComponent,
    PaymentComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
