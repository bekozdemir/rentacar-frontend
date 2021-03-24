import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand?:Brand;
  brandFilterText:string;
  dataLoaded = false;

  constructor(private brandService:BrandService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
   this.brandService.getBrands().subscribe(response=>{
     this.brands = response.data
     this.dataLoaded = true
   })
  }

  setQueryParams(brand:Brand){
    if(brand){
      this.setCurrentBrand()
    }else{
      this.clearCurrentBrand()
    }
  }
  
  setCurrentBrand() {
    this.router.navigate(['cars/','brand', this.currentBrand.brandId]);
  }

  isCurrentBrand(brand: Brand) {
    if (brand == this.currentBrand) {
      return true
    } else {
      return false
    }
  }

  isAllBrandSelected(){
    if(!this.currentBrand){
      return true;
    }else{
      return false;
    }
  }

  clearCurrentBrand(){
    this.currentBrand = undefined;
    this.router.navigate(['cars/']);
  }
}