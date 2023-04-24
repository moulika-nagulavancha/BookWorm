import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ShoppingCart } from 'src/app/models/shoppingcart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  userId;
  totalPrice: number;
  checkOutItems = new Order();
  private unsubscribe$ = new Subject<void>();

  paymentHandler: any = null;
  stripeAPIKey: any = 'pk_test_51MwUZsDNf0KfnoLTFnMsb6TAi5qmaPhWugeTjHoQmtE3bP0ahRjV79n2QQwDw4MG9Uko09WjaZyyusBHP3iCfyoX007CQCBK0A';
  amount;
  isPaymentDone = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private checkOutService: CheckoutService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
    this.invokeStripe();
  }

  checkOutForm = this.fb.group({
    name: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    pincode: ['', [Validators.required]],
    state: ['', [Validators.required]]
  });

  get name() {
    return this.checkOutForm.get('name');
  }

  get addressLine1() {
    return this.checkOutForm.get('addressLine1');
  }

  get addressLine2() {
    return this.checkOutForm.get('addressLine2');
  }

  get pincode() {
    return this.checkOutForm.get('pincode');
  }
  get state() {
    return this.checkOutForm.get('state');
  }

  ngOnInit() {
    this.getCheckOutItems();
  }

  getCheckOutItems() {
    this.cartService.getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: ShoppingCart[]) => {
          this.checkOutItems.orderDetails = result.map(b => {
            if (b.book.price > 100) {
              b.book.price = b.book.price / 80;
            }
            return b;
          });
          this.getTotalPrice();
        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.checkOutItems.orderDetails.forEach(item => {
      this.totalPrice += (item.book.price * item.quantity);
    });
    this.checkOutItems.cartTotal = this.totalPrice;
  }

  placeOrder() {
    let getPaymentInfo = document.getElementsByClassName("paymentSuccess");
    if (getPaymentInfo.length == 0) {
      this.snackBarService.showSnackBar("Please make the payment!...");
    } else {
      this.isPaymentDone = true;
    }
    if (this.checkOutForm.valid && this.isPaymentDone) {
      this.checkOutService.placeOrder(this.userId, this.checkOutItems)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          result => {
            this.subscriptionService.cartItemcount$.next(result);
            this.router.navigate(['/myorders']);
            this.snackBarService.showSnackBar('Order placed successfully!!!');
          }, error => {
            console.log('Error ocurred while placing order : ', error);
          });
    }
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        if (stripeToken != null && window.document.getElementById('stripe-script')) {
          document.getElementById('stripe-script').setAttribute("class", "paymentSuccess");
        }
      },
    });
    paymentHandler.open({
      name: 'ucm.bookworm.com',
      description: 'Online Book Store Service',
      amount: amount * 100,
    });
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
  
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {},
        });
      };
      window.document.body.appendChild(script);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
