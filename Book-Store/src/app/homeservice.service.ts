import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  constructor(private http:HttpClient) {}

  getBestSeller(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/best-sellers?limit=4& page=1`);
  }

  getNovels(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/category/Novels?limit=4&page=1`);
  }
  
  getDiscount(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books/discount?page=1&limit=4`);
  }

  getAllBooks(): Observable <any>
  {
    return this.http.get(`http://localhost:4000/books`);
  }

}
//http://localhost:4000/books/best-sellers?limit=5&page=1
