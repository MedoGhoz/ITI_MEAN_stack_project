import { Component, OnInit } from '@angular/core';
import { Ibook } from 'books';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'User';
import { HttpHeaders } from '@angular/common/http';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Ibook;
  relatedBooks: any[] = [];
  id!: Number;
  user!: User;
  constructor(private books: BooksService, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {

      this.user = newUser;
    })
  }

  ngOnInit(): void {
    if (this.id == undefined)
      this.id = Number(this.route.snapshot.paramMap.get('isbn'));
    this.books.getBookByISBN(this.id).subscribe({
      next: (data) => {
        this.book = data[0];
        this.books.getCategory(this.book.category!, 6, 1).subscribe({
          next: (data) => {
            this.relatedBooks = data;
          }
        })
      }
    })

  }


  reloadPage(isbn: Number) {
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

   addCart() {
    this.books.addToCart(this.book._id, this.user.token).subscribe({
      next: (data) => {
        location.reload()
      }
    })
    
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.books.addRating(this.book._id, $event.newValue, this.user.token).subscribe({
      next: (data) => {
        location.reload()
      }
    })

  }

}
