import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { BookFormComponent } from './components/admin/book-form/book-form.component';
import { ManageBooksComponent } from './components/admin/manage-books/manage-books.component';
import { DeleteBookComponent } from './components/admin/delete-book/delete-book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddtocartComponent,
    BookDetailsComponent,
    BookFilterComponent,
    BookCardComponent,
    CheckoutComponent,
    HomeComponent,
    LoginComponent,
    MyOrdersComponent,
    PageNotFoundComponent,
    PriceFilterComponent,
    SearchComponent,
    ShoppingcartComponent,
    UserRegistrationComponent,
    BookFormComponent,
    ManageBooksComponent,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
