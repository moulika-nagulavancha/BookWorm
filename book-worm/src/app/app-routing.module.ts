import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AdminAuthGuard } from './gaurds/admin-auth.guard';
import { AuthGuard } from './gaurds/auth.guard';



const appRoutes: Routes = [
  { path: '', component: CarouselComponent, pathMatch: 'full' },
  { path: 'books', component: HomeComponent},
  { path: 'filter', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'books/details/:id', component: BookDetailsComponent },
  { path: 'shopping-cart', component: ShoppingcartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/books',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AdminAuthGuard],
    canActivate: [AdminAuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
