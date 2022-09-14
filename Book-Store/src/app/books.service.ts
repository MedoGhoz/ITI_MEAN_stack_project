import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBookDetails(bookId:string,):Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/tv/${bookId}`);
}

}
