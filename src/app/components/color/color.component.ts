import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colorFilterText:string;
  colors:Color[] = []
  currentColor:Color
  dataLoaded = false
  constructor(private colorService:ColorService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
      this.dataLoaded=true 
    })
  }

  setCurrentColor(){
    this.router.navigate(['cars/','color', this.currentColor.colorId])
  }  

  setQueryParams(color:Color){
    if (color) {
      this.setCurrentColor()
    }else{
      this.clearCurrentColor()
    }
  }

  isCurrentColor(color:Color){
    if (color==this.currentColor) {
      return true
    } else {
      return false
    }
  }

  isAllColorSelected(){
    if(!this.currentColor){
      return true
    }else{
      return false
    }
  }

  clearCurrentColor(){
    this.currentColor= undefined;
    this.router.navigate(['/cars'], {queryParams: {colorId: undefined}, queryParamsHandling: 'merge', relativeTo: this.route})
  }
}
