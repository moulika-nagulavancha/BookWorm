import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import sales from '../../../../assets/data-visualisation/sales.json';
import booksales from '../../../../assets/data-visualisation/booksales.json';

interface Sales {
  year: string,
  units: number
}

interface BookSales {
  SaleId: number,
  OrderId: number,
  ProductId: number,
  Quantity: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: Book[];
  products: Book[];

  noOfBooks: number;
  soldBooks: number;
  noOfCategories: number;
  noOfCustomers: number;
  pieChartOptions: any;
  barChartOptions: any;
  splineChartOptions: any;

  salesData: Sales[] = sales as Sales[];
  bookSalesData: BookSales[] = booksales as BookSales[];


  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBookData();
    this.books = JSON.parse(localStorage.books);
    this.noOfBooks = this.books.filter(item => item.bookId !== null).length;
    this.getCategories();
    this.soldBooks = this.noOfBooks * 100;
    this.noOfCustomers = this.noOfBooks * 8;
    // creating various charts
    this.createLineChart();
    this.createPieChart();
    this.createSplineChart();
  }

  getCategories() {
    this.bookService.categories$.subscribe(categories => {
      this.noOfCategories = categories.length;
    })
  }

  getAllBookData() {
    this.bookService.getAllBooks()
      .subscribe((data: Book[]) => {
        localStorage.books = JSON.stringify(data);
      }, error => {
        console.log('Error ocurred while fetching book details : ', error);
      });
  }

  createPieChart() {

    let labels = Array.from(new Set(this.books.map(x => x.category)));
    let y = 0;
    let data = labels.map((x) => {
      let countArray = { label: x, y: y };
      labels.forEach((label) => {
        countArray.y = label.length
      });
      return countArray;
    });

    this.pieChartOptions = {
      title:{
        text: "Total Books by Categories",
      },
      animationEnabled: true,
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{label}: {y}",
        dataPoints: data
      }]
    }
  }

  createLineChart() {
    let data = [];
    this.salesData.map(s => {
      data.push({label: s.year, y: s.units});
      return data;
    });

    this.barChartOptions = {
      title:{
        text: "Total Sales by Year"
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
      },
      data: [{
        type: "bar",
        indexLabel: "{y}"+"k",
        dataPoints: data
      }]
    }	;

  }

  createSplineChart() {
    let data = [];
    this.bookSalesData.map(s => {
      data.push({y: s.Quantity});
      return data;
    });

    this.splineChartOptions = {
      animationEnabled: true,
      title: {
        text: "Quantity Growth Rate"
      },
      axisY: {
        title: "No. of Quantities Sold",
      },
      data: [{
        type: "spline",
        dataPoints: data
      }]
    }
  }


}
