import { HttpParams } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [ './carousel.component.css' ],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class CarouselComponent implements OnInit{
  ngOnInit() {
    console.log("Reached this page");
    
  }
  title = 'ng-carousel-demo';
  q1 = {};
  q2 = {'item':'penny'};
  q3 = {'category':'fiction'};
  q4 = {'price': '500'};
  q5 = {'category' : 'romance'};

  images = [
    {title: 'Trending this week', short: 'ROOMIES by Chritina Lauren', routeL:"/books/details/29", queryp:this.q1,
      src: "https://bookcart.azurewebsites.net//Upload/267e7cea-d66e-4e00-a220-c0ee7e70fdaf33322.jpg"},
    {title: 'Top 3 books by', short: 'Penny Reid', routeL:'/search', queryp:this.q2, 
      src: "https://bookcart.azurewebsites.net//Upload/9749b4d2-d8be-4e9b-b7ea-d437a3a9bf0e136395874.jpg"},
    {title: 'Best selling Fiction', short: 'New York Times', routeL:"/filter", queryp:this.q3,
      src: "https://bookcart.azurewebsites.net//Upload/4ec2ffb6-b21a-43ce-bf90-04d56ec72644HP7.jpg"}
  ];

  image_other = [{title: 'Books under $500', routeL:"books", queryp:this.q1,
      src: "https://bookcart.azurewebsites.net//Upload/5b7162d6-2780-461b-be6f-e4debac083ad18007564.jpg"},
    {title: 'Buy again', routeL:'/search', queryp:this.q2, 
      src: "https://bookcart.azurewebsites.net//Upload/b868eb26-f12c-4dcf-ba19-03e0d6cafb8d36373564.jpg"},
      {title: 'All books', routeL:'/books', queryp:this.q1, 
      src: "https://bookcart.azurewebsites.net//Upload/58dbce6c-7c82-4491-be4f-c170867ba4b6qq.jpg"},
      {title: 'Rated 4+', routeL:'/books', queryp:this.q1, 
      src: "https://bookcart.azurewebsites.net//Upload/0e6688cb-47e4-438c-9648-543f174878d5qq.jpg"},
      {title: 'Romance Novels', routeL:'/filter', queryp:this.q5, 
      src: "https://bookcart.azurewebsites.net//Upload/c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"}];
  
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
  }

}
