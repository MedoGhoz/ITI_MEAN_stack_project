import { Component, OnInit } from '@angular/core';
import { Ibook } from 'books';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Ibook;
  relatedBooks: any[] = [];
  id!: Number;
  constructor(private books: BooksService,private route:ActivatedRoute,) { }

  ngOnInit(): void {
    if(this.id == undefined)
      this.id = Number(this.route.snapshot.paramMap.get('isbn'));
      this.books.getBookByISBN(this.id).subscribe({next:(data)=>{
        this.book = data[0];
        console.log(data[0]);
        this.books.getCategory(this.book.category!, 6,1).subscribe({next:(data)=>{
          this.relatedBooks = data;
          console.log(...data);
        }})
      }})
    
  }
  ratingStars(){
   let avg = this.book.rating.average;
    if(avg<=2) return '★☆☆☆☆';
    else if(avg<=4) return '★★☆☆☆';
    else if(avg<=6) return '★★★☆☆';
    else if(avg<=8) return '★★★★☆';
    else if(avg<=10) return '★★★★★';
    else return '-----'
  }

  reloadPage(isbn:Number){
    this.id = isbn;
    this.ngOnInit();
    setTimeout(() => {
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }, 800);
  }

  checkSignedIn(){

  }

}
