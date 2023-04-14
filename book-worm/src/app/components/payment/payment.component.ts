import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentHandler: any = null;
  stripeAPIKey: any = 'pk_test_51MwUZsDNf0KfnoLTFnMsb6TAi5qmaPhWugeTjHoQmtE3bP0ahRjV79n2QQwDw4MG9Uko09WjaZyyusBHP3iCfyoX007CQCBK0A';
  amount;
  constructor(private route: ActivatedRoute) {
    this.amount = this.route.snapshot.paramMap.get('amount');
  }
  
  ngOnInit() {
    this.invokeStripe();
  }
  
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: function (stripeToken: any) {},
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

}
