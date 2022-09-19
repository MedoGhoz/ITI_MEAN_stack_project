import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartBook } from 'CartBook';
import { User } from 'User';
import { BooksService } from '../books.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  books!: CartBook[];
  user!: User;
  showMessage!: boolean;
  totalPrice:number = 0;
  userCredit!: number;
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
          for(let book of this.books){
            this.totalPrice += book.price * (1 - book.discount / 100);
          }
        }
        

      }
    });
    this.userService.getCredit(this.user.token).subscribe({
      next: (userData) => {
        this.userCredit = userData.credit;
        
      }
    });
  }

  makeOrder(){
    this.userService.order(this.user.token).subscribe({
      next: (BooksData) => {
        console.log(BooksData);
        window.location.reload();
        this.userService.getCredit(this.user.token).subscribe({
          next: (userData) => {
            this.userCredit = userData.credit; 
          }
        });
      }
    });
  }

}
