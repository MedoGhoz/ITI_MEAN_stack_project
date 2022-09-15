import {MatPaginatorModule} from '@angular/material/paginator';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorypageService } from '../categorypage.service';
import {Ibook} from '../../../books';
import { PageEvent } from '@angular/material/paginator';



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




  constructor(private categorypage: CategorypageService,private route:ActivatedRoute) { 

  }

  ngOnInit(): void {
    console.log("initialize");
    this.categoryName = this.route.snapshot.paramMap.get("cat");
    this.categorypage.getBooks(this.categoryName,this.currentPage,5).subscribe({
      next: (BooksData) => {
        console.log(BooksData);
        this.Books=BooksData;
        this.FilteredBooks = this.Books.filter(
          (element)=>{
          if(element.category==this.categoryName) return element;
        }
        );
      }
    });
  }



  changePage(pageData:PageEvent){
    console.log("pageEvent");
    
    this.currentPage=pageData.pageIndex+1;
    this.categorypage.getBooks(this.categoryName,this.currentPage,pageData.pageSize).subscribe({
      next: (moviesData) => {
        this.Books = moviesData.results;
        this.FilteredBooks = this.Books;
        
        
      },
    });
    this.ngOnInit();
  }


  ngOnChanges(): void {
    
  }
showDescrip(bookISBN:number){
  this.categorypage.flipDetails(bookISBN);
}



}
