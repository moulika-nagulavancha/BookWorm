import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  private formData = new FormData();
  bookForm: FormGroup;
  book: Book = new Book();
  formTitle = 'Add';
  coverImagePath;
  bookId;
  files;
  categoryList: [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      bookId: 0,
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get category() {
    return this.bookForm.get('category');
  }

  get price() {
    return this.bookForm.get('price');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.bookId = +params.id;
        this.fetchBookData();
      }
    });
  }

  fetchBookData() {
    this.formTitle = 'Edit';
    this.bookService
      .getBookById(this.bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: Book) => {
          this.setBookFormData(result);
        },
        (error) => {
          console.log('Error ocurred while fetching book data : ', error);
        }
      );
  }

  onFormSubmit() {
    if (!this.bookForm.valid) {
      return;
    }
    if (this.files && this.files.length > 0) {
      for (let j = 0; j < this.files.length; j++) {
        this.formData.append('file' + j, this.files[j]);
      }
    }
    this.formData.append('bookFormData', JSON.stringify(this.bookForm.value));

    if (this.bookId) {
      this.editBookDetails();
    } else {
      this.saveBookDetails();
    }
  }

  editBookDetails() {
    this.bookService
      .updateBookDetails(this.formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.saveBook('edit');
          this.router.navigate(['/admin/books/manage']);
        },
        (error) => {
          console.log('Error ocurred while updating book data : ', error);
        }
      );
  }

  saveBookDetails() {
    this.bookService
      .addBook(this.formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.saveBook('add');
          this.router.navigate(['/admin/books/manage']);
        },
        (error) => {
          this.bookForm.reset();
          console.log('Error ocurred while adding book data : ', error);
        }
      );
  }

  saveBook(action: string) {
    var books = JSON.parse(localStorage.books);
    if (action == 'edit') {
      for (let book of books) {
        if (book.bookId == this.bookId) {
          book.title = this.title.value;
          book.price = this.price.value;
          book.category = this.category.value;
          book.author = this.author.value;
          
          localStorage.books = JSON.stringify(books);
          break;
        }      
      }
    }

    if (action == 'add') {
      let b = new Book();
      b.bookId = Math.floor(Math.random()*898)+101;
      b.title = this.title.value;
      b.price = this.price.value;
      b.author = this.author.value;
      b.category = this.category.value;
      books.push(b);
      books.sort();
      localStorage.books = JSON.stringify(books);
    }
    
  }

  cancel() {
    this.router.navigate(['/admin/books/manage']);
  }

  setBookFormData(bookFormData) {
    this.bookForm.setValue({
      bookId: bookFormData.bookId,
      title: bookFormData.title,
      author: bookFormData.author,
      category: bookFormData.category,
      price: (bookFormData.price / 80),
    });
    this.coverImagePath =
      'https://bookcart.azurewebsites.net/Upload/' + bookFormData.coverFileName;
  }

  uploadImage(event) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (myevent: ProgressEvent) => {
      this.coverImagePath = (myevent.target as FileReader).result;
    };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
