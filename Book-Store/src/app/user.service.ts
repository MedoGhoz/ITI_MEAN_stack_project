import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';
import { IUserLogin } from 'IUserLogin';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'User';
import { IUserRegister } from 'IUserRegister';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();

  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>('http://localhost:4000/login', userLogin).pipe(tap({
      next: (user) => {
        console.log(user);

        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(
          `welcome to websiteName ${user.name}!`,
          'Login Successful !'
        )


      }, error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Login Failed');
      }
    }))
  }


  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>('http://localhost:4000/register', userRegister).pipe(tap({
      next: (user) => {
        this.setUserToLocalStorage(user)
        this.userSubject.next(user)
        this.toastrService.success(
          `Welcome To Websitename ${user.name}`,
          'Register Successful'
        )
      }, error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          'Register Failed')
      }
    }))
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  showCart(token: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.post(`http://localhost:4000/user/cart`, {}, {
      headers: header
    });
  }

  removeCart(bookId: string, token: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.put(`http://localhost:4000/books/removeCart/${bookId}`, {}, {
      headers: header
    });
  }

  getCredit(token: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.post(`http://localhost:4000/user/credit`, {}, {
      headers: header
    });
  }


  order(token: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json',)
    return this.http.put(`http://localhost:4000/placeorder`, {}, {
      headers: header
    });
  }


}
