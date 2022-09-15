import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategorypageComponent } from './categorypage/categorypage.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path: 'category/:cat', component: CategorypageComponent},
{path:'books/isbn/:isbn',component: BookDetailsComponent},
{path:'home',component: HomeComponent},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
