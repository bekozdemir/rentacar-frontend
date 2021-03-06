import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  cars:Car[];
  currentBrand:number;
  currentColor:number;

  constructor(private brandService:BrandService, private colorService:ColorService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    
    this.getBrands(),
    this.getColors()
    
  }
  
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
      
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  getSelectedBrand(brandId:number){
    if (this.currentBrand == brandId) {
      return true
    }else return false
  }

  getSelectedColor(colorId:number){
    if (this.currentColor == colorId) {
      return true
    }else return false
  }

}
