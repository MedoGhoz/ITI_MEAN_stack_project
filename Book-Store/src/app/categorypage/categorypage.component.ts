import {MatPaginatorModule} from '@angular/material/paginator';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Ibook} from '../../../books';
import { PageEvent } from '@angular/material/paginator';
import { BooksService } from '../books.service';



@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css']
})
export class CategorypageComponent implements OnInit,OnChanges {
  categoryName!:string|null;
  Books!:Ibook[];
  FilteredBooks!:Ibook[];
  currentPage!:number;
  //showDescription:boolean=false;




  constructor(private categorypage: BooksService,private route:ActivatedRoute) {
    route.params.subscribe((params)=>{
      if(params.search){
        this.categorypage.getBooksByTitle(params.search).subscribe({next:(books)=>{
          this.Books=books
        }})
      }
    })
  }

  ngOnInit(): void {
    this.update();
  }

 update():void{
  this.categoryName = this.route.snapshot.paramMap.get("cat");
  this.categorypage.getCategory(this.categoryName,8,this.currentPage).subscribe({
    next: (BooksData) => {
      console.log(BooksData);
      this.Books=BooksData;
      // this.FilteredBooks = this.Books.filter(
      //   (element)=>{
      //   if(element.category==this.categoryName) return element;
      //   el
      // }
      // );
    }
  });
 }

  changePage(pageData:PageEvent){
    console.log("pageEvent");

    this.currentPage=pageData.pageIndex+1;
    this.categorypage.getCategory(this.categoryName,pageData.pageSize,this.currentPage).subscribe({
      next: (moviesData) => {
        this.Books = moviesData.results;
        this.FilteredBooks = this.Books;


      },
    });
    this.update();
  }


  ngOnChanges(): void {

  }
showDescrip(bookISBN:number){
  this.categorypage.flipDetails(bookISBN);
}



}
