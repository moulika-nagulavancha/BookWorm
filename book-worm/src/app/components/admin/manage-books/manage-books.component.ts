import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'author', 'category', 'price', 'operation'];

  dataSource = new MatTableDataSource<Book>();
  bookData: Book[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.getAllBookData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllBookData() {
    this.bookService.getAllBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Book[]) => {
        if (localStorage.books != null) {
          this.dataSource.data = JSON.parse(localStorage.books);
        } else {
          this.dataSource.data = Object.values(data);
          localStorage.books = JSON.stringify(data);
        }
      }, error => {
        console.log('Error ocurred while fetching book details : ', error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: id
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result === 1) {
          this.removeBookFromData(id);
          this.snackBarService.showSnackBar('Data deleted successfully');
        }
      });
  }

  editBookDetails(id: number) {
    const dialogRef = this.dialog.open(BookFormComponent, {
      data: id
    });
  }

  removeBookFromData(id: number) {
    var books = JSON.parse(localStorage.books);
    for (let book of books) {
      if (book.bookId == id) {
          books.splice(books.indexOf(book), 1);
          break;
      }      
    }
    this.dataSource.data = books;
    localStorage.books = JSON.stringify(books);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
