import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MyordersService } from 'src/app/services/myorders.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['orderId', 'orderedOn', 'orderTotal'];
  dataSource = new MatTableDataSource<Order>();
  expandedElement: null;
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  userId;
  isLoading: boolean;
  private unsubscribe$ = new Subject<void>();

  constructor(private orderService: MyordersService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.isLoading = true;
    this.getMyOrderDetails();
  }

  getMyOrderDetails() {
    this.orderService.myOrderDetails(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Order[]) => {
        if (result != null) {
          this.dataSource.data = Object.values(result);
          this.isLoading = false;
        }
      }, error => {
        console.log('Error ocurred while fetching my order details : ', error);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
