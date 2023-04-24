import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AddtocartComponent,
    BookDetailsComponent,
    BookFilterComponent,
    BookCardComponent,
    CheckoutComponent,
    HomeComponent,
    CarouselComponent,
    LoginComponent,
    MyOrdersComponent,
    PageNotFoundComponent,
    PriceFilterComponent,
    SearchComponent,
    ShoppingcartComponent,
    UserRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
