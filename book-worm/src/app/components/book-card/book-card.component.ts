import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input()
  book: Book;

  isActive = false;
  userData$: Observable<User>;

  constructor(private router: Router, private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.userData$ = this.subscriptionService.userData;
  }

  goToPage(id: number) {
    this.router.navigate(['/books/details/', id]);
  }
}