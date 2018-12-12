import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {OrderFilter} from '../model/orderFilter';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Observable<Order[]>;
  status = 'NOT_REALISED';

  constructor(private orderService: OrderService, ) { }

  ngOnInit() {
    const filter = new OrderFilter(this.status, null);
    this.orders = this.orderService.getOrders(filter);
    this.orders.subscribe(o => console.log(o));
  }

  getOrderItemNames(order: Order): string {
    return order.items.map(e => e.orderItem.product.name).join(', ');
  }

  filterStatus(status: string): string {
    return this.status = status;
  }

  realizeOrder(order) {
    this.orderService.realizeOrder(order);
  }

}
