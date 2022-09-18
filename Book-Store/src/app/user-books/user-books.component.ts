import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'User';
import { UserBook } from 'UserBooks';
import { BooksService } from '../books.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {
  books!:UserBook[];
  user!: User;
  constructor(private categorypage: BooksService, private route: ActivatedRoute, private userService: UserService) {
    userService.userObservable.subscribe((newUser)=>{
      this.user=newUser;
    })
    this.categorypage.showBooks(this.user.token).subscribe({
      next: (BooksData) => {
        this.books = BooksData;
      }
    });

   }

  ngOnInit(): void {
    this.update()
  }

  update(): void {
    this.categorypage.showBooks(this.user.token).subscribe({
      next: (BooksData) => {
        this.books = BooksData;
      }
    });
  }
}
