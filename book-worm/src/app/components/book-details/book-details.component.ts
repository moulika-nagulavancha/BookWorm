import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookId;
  simbooks$: Observable<Book[]>;
  simbooks: Book[];
  BookDetails$: Observable<Book>;
  userData$: Observable<User>;
  routeURL;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService) {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.routeURL = this.route.url;
    this.route.params.subscribe(
      params => {
        this.bookId = +params.id;
        this.getBookDetails();
        this.getSimilarBooks();
      }
    );
    this.userData$ = this.subscriptionService.userData;
  }

  getBookDetails() {
    this.BookDetails$ = this.bookService.getBookById(this.bookId)
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching book data : ', error);
          return EMPTY;
        }));
  }

  getSimilarBooks() {
    this.bookService.getsimilarBooks(this.bookId).subscribe(data=>{this.simbooks = data});
  }
}
