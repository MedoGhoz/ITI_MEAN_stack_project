import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartBook } from 'CartBook';
import { User } from 'User';
import { UserBook } from 'UserBooks';
import { BooksService } from '../books.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  books!: CartBook[];
  user!: User;
  showMessage!: boolean;
  totalPrice:number = 0;
  subTotalPrice:number = 0;
  discount: number = 0;
  constructor(private categorypage: BooksService, private route: ActivatedRoute, private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
    this.update()
  }

  update(): void {
    this.categorypage.showCart(this.user.token).subscribe({
      next: (BooksData) => {
        console.log(BooksData);
        
        if(BooksData.message){
          console.log("No books found");
          this.showMessage = true;
        }else{
          this.books = BooksData;
          this.showMessage = false;
          this.CalcTotalPrice()
        }
        

      }
    });
  }

  removeFromCart(bookId: string){
    console.log(bookId);
    
    this.userService.removeCart(bookId,this.user.token).subscribe({
      next: (BooksData) => {
        console.log(BooksData);
        
      }
    });
  }

  CalcTotalPrice(){
    for(let book of this.books){
      this.subTotalPrice += book.price;
      this.discount +=book.price * (book.discount / 100);
      this.totalPrice += book.price * (1 - book.discount / 100);
    }
  }

}
