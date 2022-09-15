import { Component, OnInit } from '@angular/core';
import { Ibook } from 'books';
import { HomeserviceService } from '../homeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestSeller: Ibook[] = [];
  novels : Ibook[] = [];
  discount:Ibook[] = [];
  topRate : Ibook[]=[];
  constructor(private movieService: HomeserviceService ) { }
 
  ngOnInit(): void {
    this.movieService.getBestSeller().subscribe({next:(data:any)=>{
      console.log(data);
      this.bestSeller = data;
    }});
    
    this.movieService.getNovels().subscribe({next:(data:any)=>{
      console.log(data);
      this.novels = data;
    }});

    this.movieService.getDiscount().subscribe({next:(data:any)=>{
      console.log(data);
      this.discount = data;
    }});
}
}