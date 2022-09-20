import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ibook } from '../../../books';
import { PageEvent } from '@angular/material/paginator';
import { BooksService } from '../books.service';
import { User } from 'User';
import { UserService } from '../user.service';




@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css']
})
export class CategorypageComponent implements OnInit, OnChanges {
  categoryName!: string | null;
  Books!: Ibook[];
  FilteredBooks!: Ibook[];
  currentPage: number=1;
  totalLength:number=0;
  user!: User;
  //showDescription:boolean=false;




  constructor(private categorypage: BooksService, private route: ActivatedRoute, private userService: UserService) {
    userService.userObservable.subscribe((newUser)=>{

      this.user=newUser;
    })
    route.params.subscribe((params) => {
      if (params.search) {
        this.categorypage.getBooksByTitle(params.search).subscribe({
          next: (books) => {
            this.Books = books
            this.totalLength=books.length
          }
        })
      } else if (route.snapshot.url[0].path === "most_selling") {
        this.categorypage.getMostSellingBooks().subscribe({
          next: (books) => {
            this.Books = books
            this.totalLength=books.length
          }
        })
      }else if(route.snapshot.url[0].path === "hot"){
        this.categorypage.getDiscountBooks().subscribe({
          next: (books) => {
            this.Books = books
            this.totalLength=books.length
          }
        })

      } else if (route.snapshot.url[0].path === "allBooks") {
        this.categorypage.getAllBooks().subscribe({
          next: (books) => {
            this.Books = books
            this.totalLength=books.length
            this.Books.sort(function(a,b){
                if(a.title>b.title){
                  return -1;
                }
                if(a.title<b.title){
                  return 1;
                }
                return 0;

        })
          }
        })
        // console.log(route.snapshot.url[0].path);

        // this.categorypage.showBooks(this.user.token).subscribe({
        //   next: (books) => {
        //     // this.Books = books
        //     console.log(books);

        //   }
        // })

      }
    })

  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.categoryName = this.route.snapshot.paramMap.get("cat");
    this.categorypage.getCategory(this.categoryName, 8, this.currentPage).subscribe({
      next: (BooksData) => {
        this.Books = BooksData;
        this.totalLength=BooksData.length
        // this.totalLength=BooksData.length
        // this.FilteredBooks = this.Books.filter(
        //   (element)=>{
        //   if(element.category==this.categoryName) return element;
        //   el
        // }
        // );
      }
    });
  }

  changePage(pageData: PageEvent) {

    this.currentPage = pageData.pageIndex + 1;
    this.categorypage.getCategory(this.categoryName, pageData.pageSize, this.currentPage).subscribe({
      next: (moviesData) => {
        this.Books = moviesData.results;
        this.FilteredBooks = this.Books;


      },
    });
    this.update();
  }


  ngOnChanges(): void {

  }
  showDescrip(bookISBN: number) {
    this.categorypage.flipDetails(bookISBN);
  }



}
