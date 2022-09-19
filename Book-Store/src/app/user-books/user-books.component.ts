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
  showMessage!: boolean;
  constructor(private categorypage: BooksService, private route: ActivatedRoute, private userService: UserService) {
    userService.userObservable.subscribe((newUser)=>{
      this.user=newUser;
    })

   }

  ngOnInit(): void {
    this.update()
  }

  update(): void {
    this.categorypage.showBooks(this.user.token).subscribe({
      next: (BooksData) => {
        if(BooksData.message){
          console.log("No books found");
          this.showMessage = true;
        }else{
          this.books = BooksData;
          this.showMessage = false;
        }
      }
    });
  }
}
