import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibook } from 'books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  Books!:Ibook[];

  constructor(private http: HttpClient) { }

  getBookById(bookId:string):Observable<any>{
    return this.http.get(`http://localhost:4000/books/id/${bookId}`);
  }

  getBookByISBN(ISBN:Number):Observable<any>{
    return this.http.get(`http://localhost:4000/books/isbn/${ISBN}`);
  }

  getCategory(category:string|null,limit:number,pageNumber:number):Observable<any>{
    console.log("got Books");
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
   getBooksByTitle(title:string): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/title/${title}`);
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
