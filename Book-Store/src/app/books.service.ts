import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibook } from 'books';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  Books!:Ibook[];

  constructor(private http: HttpClient, private toastrService:ToastrService) { }

  getBookById(bookId:string):Observable<any>{
    return this.http.get(`http://localhost:4000/books/id/${bookId}`);
  }

  getBookByISBN(ISBN:Number):Observable<any>{
    return this.http.get(`http://localhost:4000/books/isbn/${ISBN}`);
  }

  getCategory(category:string|null,limit:number,pageNumber:number):Observable<any>{
    return this.http.get(`http://localhost:4000/books/category/${category}?limit=${limit}&page=${pageNumber}`);

  }

  getSpecialBooks(type:string): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/${type}?limit=4&page=1`);
  }

  getAllBooks(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books`);
  }
  getMostSellingBooks(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/best-sellers`);
  }

  getDiscountBooks(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/discount`);
  }

   getBooksByTitle(title:string): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/title/${title}`);
  }

   addToCart(bookId:string,token:string): Observable <any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.put(`http://localhost:4000/books/addCart/${bookId}`,{},{
      headers: header
    });
  }

   addRating(bookId:string, rating:number, token:string): Observable <any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.put(`http://localhost:4000/rating`,{rate: rating,book_id:bookId},{
      headers: header
    });
  }

   showBooks(token:string): Observable <any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.post(`http://localhost:4000/user/books`,{},{
      headers: header
    });
  }

   showCart(token:string): Observable <any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.post(`http://localhost:4000/user/cart`,{},{
      headers: header
    });
  }

  

  
//  books/title/:title
  flipDetails(bookISBN: number) {
    this.Books.forEach((element: any) => {
      if (element.ISBN == bookISBN) {
        element.showdetails = !element.showdetails;
      }
    });
  }

}
