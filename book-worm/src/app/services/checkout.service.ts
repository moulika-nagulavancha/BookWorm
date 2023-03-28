import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://bookcart.azurewebsites.net/api/CheckOut/';
  }

  placeOrder(userId: number, checkedOutItems: Order) {
    return this.http.post<number>(this.baseURL + `${userId}`, checkedOutItems);
  }
}
