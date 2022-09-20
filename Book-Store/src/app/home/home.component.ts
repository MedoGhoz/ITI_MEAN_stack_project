import { Component, OnInit } from '@angular/core';
import { Ibook } from 'books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bestSeller: Ibook[] = [];
  novels : Ibook[] = [];
  discount:Ibook[] = [];
  arts : Ibook[]=[];
  allBooks : Ibook[]=[];
  constructor(private bookService: BooksService ) { }

  ngOnInit(): void {
    this.bookService.getSpecialBooks('best-sellers').subscribe({next:(data:any)=>{
      this.bestSeller = data;
    }});

    this.bookService.getCategory('Novels',4,1).subscribe({next:(data:any)=>{
      this.novels = data;
    }});
    this.bookService.getCategory('Arts',4,1).subscribe({next:(data:any)=>{
      this.arts = data;
    }});
    this.bookService.getSpecialBooks('discount').subscribe({next:(data:any)=>{
      this.discount = data;
    }});
    this.bookService.getAllBooksLimit(4,1).subscribe({next:(data:any)=>{

      this.allBooks = data;

    }});
}
}
