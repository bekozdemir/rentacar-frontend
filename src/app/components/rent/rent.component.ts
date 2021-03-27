import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { RentItems } from 'src/app/models/rentItems';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  customers:Customer[]

  customerId:Number;
  rentDate:Date;
  returnDate:Date;
  @Input() car:Car;

  constructor(private activatedRoute:ActivatedRoute, private customerService:CustomerService,  private router:Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCustomer()
   
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data
      console.log(response)
    })
  }

  createRental(){
    let NewRental:RentItems ={
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.car.id,
      customerId: this.customerId
    }
    this.router.navigate(['/payment/', JSON.stringify(NewRental)]);  
    this.toastrService.info("Ödeme sayfası yükleniyor", "Ödeme işlemleri")
    console.log(NewRental)
  }
}
