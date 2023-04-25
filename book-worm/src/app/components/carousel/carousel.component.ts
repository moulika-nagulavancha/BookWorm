import { Component, OnInit, VERSION } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [ './carousel.component.css' ],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class CarouselComponent implements OnInit{
  ngOnInit() {
    this.getAllBookData();
  }
  title = 'ng-carousel-demo';
  q1 = {};
  q2 = {'item':'penny'};
  q3 = {'category':'fiction'};
  q4 = {'price': '10'};
  q5 = {'category' : 'romance'};

  images = [
    {title: 'Best selling Fiction', short: 'New York Times', routeL:"/filter", queryp:this.q3,
      src: "assets/images/harrypotter.jpg"},
    {title: 'Trending this week', short: 'ROOMIES by Chritina Lauren', routeL:"/books/details/29", queryp:this.q1,
      src: "assets/images/roomies.jpg"},
    {title: 'Popular books by', short: 'Penny Reid', routeL:'/search', queryp:this.q2, 
      src: "assets/images/pennyreid.jpg"}
  ];

  image_other = [
      {title: 'All books', routeL:'/books', queryp:this.q1, 
      src: "https://bookcart.azurewebsites.net//Upload/58dbce6c-7c82-4491-be4f-c170867ba4b6qq.jpg"},
      {title: 'Books under $10', routeL:"books", queryp:this.q4,
      src: "https://bookcart.azurewebsites.net//Upload/5b7162d6-2780-461b-be6f-e4debac083ad18007564.jpg"},
      {title: 'Buy again', routeL:'/myorders', queryp:this.q1, 
      src: "https://bookcart.azurewebsites.net//Upload/b868eb26-f12c-4dcf-ba19-03e0d6cafb8d36373564.jpg"},
      {title: 'Rated 4+', routeL:'/books', queryp:this.q1, 
      src: "https://bookcart.azurewebsites.net//Upload/0e6688cb-47e4-438c-9648-543f174878d5qq.jpg"},
      {title: 'Romance Novels', routeL:'/filter', queryp:this.q5, 
      src: "https://bookcart.azurewebsites.net//Upload/c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"}];
  
  constructor(config: NgbCarouselConfig, private bookService: BookService) {
    config.interval = 2000;
  }

  getAllBookData() {
    this.bookService.getAllBooks()
      .subscribe((data: Book[]) => {
        localStorage.books = JSON.stringify(data);
      }, error => {
        console.log('Error ocurred while fetching book details : ', error);
      });
  }

}
