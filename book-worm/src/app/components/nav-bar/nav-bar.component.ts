import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userId;
  userDataSubscription: any;
  userData = new User();
  userType = UserType;
  wishListCount$: Observable<number>;
  cartItemCount$: Observable<number>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private subscriptionService: SubscriptionService) {

    this.userId = localStorage.getItem('userId');
    this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
      this.subscriptionService.cartItemcount$.next(data);
    });
  }

  ngOnInit() {

    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });

    this.cartItemCount$ = this.subscriptionService.cartItemcount$;
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
