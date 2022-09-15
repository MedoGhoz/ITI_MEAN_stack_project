import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBookById(bookId:string):Observable<any>{
    return this.http.get(`http://localhost:4000/books/id/${bookId}`);
  }

  getBookByISBN(ISBN:Number):Observable<any>{
    return this.http.get(`http://localhost:4000/books/isbn/${ISBN}`);
  }

  getRelatedBooks(category:string, limit:number):Observable<any>{
    return this.http.get(`http://localhost:4000/books/category/${category}/?limit=${limit}&page=1`);
  }

}
