import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Book } from '../models/book';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseURL = 'https://bookcart.azurewebsites.net/api/book/';

  constructor(private http: HttpClient) { }

  categories$ = this.http.get<Categories[]>(this.baseURL + 'GetCategoriesList').pipe(shareReplay(1));

  books$ = this.getAllBooks().pipe(shareReplay(1));

  getAllBooks() {
    return this.http.get<Book[]>(this.baseURL);
  }

  addBook(book) {
    return this.getAllBooks();
    // return this.http.post(this.baseURL, book);
  }

  getBookById(id: number) {
    // var books = JSON.parse(localStorage.books);
    // books = books.filter(b => b.bookId === id);
    // return books;

    return this.books$.pipe(map(book => book.find(b => b.bookId === id)));
  }

  getsimilarBooks(bookId: number) {
    return this.http.get<Book[]>(this.baseURL + 'GetSimilarBooks/' + bookId);
  }

  updateBookDetails(book) {
    return this.getAllBooks();
    // return this.http.put(this.baseURL, book);
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseURL + id);
  }
}
