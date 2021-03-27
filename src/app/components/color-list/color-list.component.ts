import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors:Color[]
  currentColor:Color;
  constructor(private colorService:ColorService, private toastrService:ToastrService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getColors()
  }

  
  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  clearCurrentRoute(){
    this.router.navigate(["colors"])
  }

}