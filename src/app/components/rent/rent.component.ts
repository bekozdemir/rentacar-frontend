import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { RentItems } from 'src/app/models/rentItems';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksCheckService } from 'src/app/services/findeks-check.service';


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
  findexStatus:boolean;
  @Input() car:Car;

  constructor(private activatedRoute:ActivatedRoute, 
    private customerService:CustomerService,  
    private router:Router, 
    private toastrService:ToastrService, 
    private findeksCheckService:FindeksCheckService) { }

  ngOnInit(): void {
    
    this.getCustomer()
    console.log(this.car.findeksScore)
    
    
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data
      //console.log(response)
      console.log(this.customerId)
      console.log(this.findexStatus)
    })
  }

  createRental(){
    let NewRental:RentItems ={
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.car.id,
      customerId: this.customerId,
      rentStatus: false,
      
    }
    this.router.navigate(['/payment/', JSON.stringify(NewRental)]);  
    this.toastrService.info("Ödeme sayfası yükleniyor", "Ödeme işlemleri")
    console.log(NewRental)
  }

  checkFindeks(carId:number,customerId:number){
    this.findeksCheckService.findeksCheck(carId,customerId).subscribe(response =>{
      this.findexStatus = response.success
      console.log(this.findexStatus)
    },responseError=>{
      this.toastrService.error(responseError.error.message)
      
    });

  }
}
