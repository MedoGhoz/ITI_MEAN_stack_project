import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Ibook } from 'books';
import { User } from 'User';
import { BooksService } from '../books.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
search:string="";
book:Ibook[]=[];
user!:User;
  constructor(private serv:BooksService,private activatedRoute:ActivatedRoute,private router :Router ,private userService:UserService) {
    activatedRoute.params.subscribe((params)=>{
      if(params.search){
        this.search=params.search
      }
    })

    userService.userObservable.subscribe((newUser)=>{

      this.user=newUser;
    })
  }

  ngOnInit(): void {
  }
  searchBook(title:string):void{
  this.router.navigateByUrl('/search/'+title)
  }
logout(){
this.userService.logout();
}

}
