import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Book, BookInfo } from '../models/book';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseURL = 'https://bookcart.azurewebsites.net/api/book/';
  extraURL: string = '/assets/bookInfo.json';

  constructor(private http: HttpClient) { }

  categories$ = this.http.get<Categories[]>(this.baseURL + 'GetCategoriesList').pipe(shareReplay(1));

  books$ = this.getAllBooks().pipe(shareReplay(1));
  booksInfo$ = this.getAllBooksInfo().pipe(shareReplay(1));

  getAllBooks() {
    return this.http.get<Book[]>(this.baseURL);
  }

  getAllBooksInfo() {
    return this.http.get<BookInfo[]>(this.extraURL);
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

  getBookInfoById(id: number) {
    return this.booksInfo$.pipe(map(book => book.find(b => b.bookId === id)));
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
