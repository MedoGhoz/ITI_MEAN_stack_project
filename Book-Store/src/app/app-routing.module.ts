import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategorypageComponent } from './categorypage/categorypage.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'',redirectTo:"/home",pathMatch:"full"},
  {path:'home',component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'search/:search', component: CategorypageComponent},
  {path: 'most_selling', component: CategorypageComponent},
  {path: 'category/:cat', component: CategorypageComponent},
  {path: 'mybooks', component: UserBooksComponent},
  {path: 'mycart', component: UserCartComponent},
  {path:'books/isbn/:isbn',component: BookDetailsComponent},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
