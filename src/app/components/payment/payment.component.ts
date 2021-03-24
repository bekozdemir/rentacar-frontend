import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { RentItems } from 'src/app/models/rentItems';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute,
    private carDetailService:CarDetailService, 
    private router:Router,
    private toastr: ToastrService, 
    private paymentService:PaymentService) { }
  rentItems:RentItems;
  cars:Car
  amountOfPayment:number = 0;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rentItems"]){
        this.rentItems = JSON.parse(params['rentItems']);
        this.getRental(); 
        this.getCarDetail();
        console.log(this.rentItems)
      }
    })
  }

  getRental(){
    console.log(this.rentItems);
  }

  getCarDetail(){
    this.carDetailService.getCarDetail(this.rentItems.carId).subscribe(response => {
      this.cars = response.data[0];
      console.log(response)
      this.paymentCalculator(); 
    })
  }

  paymentCalculator(){
    if(this.rentItems.returnDate != null ){
      var date1 = new Date(this.rentItems.returnDate.toString());
      var date2 = new Date(this.rentItems.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
    
      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24)); 
      
      this.amountOfPayment = numberOfDays * this.cars.dailyPrice;
      if(this.amountOfPayment <= 0){
        this.router.navigate(['/cars']);
        this.toastr.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
      }
    }
  }

  pay(){
    this.paymentService.pay(this.rentItems,this.amountOfPayment).subscribe(response => {
      this.router.navigate(['/cars']);
      this.toastr.success(response.message, "İşlem Başarılı");
    })
  }

}