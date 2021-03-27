import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalsComponent } from './components/rentals/rentals.component';


const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/car-filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/car-detail/:carId", component:CarDetailComponent},
  {path:"rentals", component:RentalsComponent},
  {path:"payment/:rentItems", component:PaymentComponent},
  {path:"cars/car-add", component:CarAddComponent},
  {path:"colors/color-add", component:ColorAddComponent},
  {path:"colors/color-list/color-add/:colorId", component:ColorAddComponent},
  {path:"brands/brand-list/brand-add/:brandId", component:BrandAddComponent},
  {path:"cars/car-add/:id", component:CarAddComponent},
  {path:"brands/brand-add", component:BrandAddComponent},
  {path:"colors/color-list", component:ColorListComponent},
  {path:"brands/brand-list", component:BrandListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
