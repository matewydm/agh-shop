import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {OrderFilter} from '../model/orderFilter';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemListComponent} from '../item-list/item-list.component';
import {OrderProduct} from '../model/orderProduct';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Observable<Order[]>;
  status: string;
  filter: OrderFilter;

  constructor(private orderService: OrderService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.status = 'NOT_REALISED';
    this.filter = new OrderFilter(this.status, null);
    this.orders = this.orderService.getOrders(this.filter);
    this.orders.subscribe(o => console.log(o));
  }

  getOrderItemNames(order: Order): string {
    return order.items.map(e => e.orderItem.amount + 'x ' + e.orderItem.product.name).join(', ');
  }

  filterStatus(status: string) {
    this.status = status;
    this.filter.status = status;
    this.orders = this.orderService.getOrders(this.filter);
  }

  realizeOrder(order) {
    this.orderService.realizeOrder(order).catch(e => {
      console.log('Zamówienie nie zostało zrealizowane');
    });
  }

  realizeSingleItems(order, items) {
    this.orderService.realizeSingleItems(order, items).catch(e => {
      console.log('Nie odznaczono elementów jako zrealizowane, sprawdź dostępnośc produktów w magazynie.', e);
    });
  }

  openSingleItemModal(order: Order) {
    const modalRef = this.modalService.open(ItemListComponent);
    modalRef.componentInstance.items = JSON.parse(JSON.stringify(order.items));
    modalRef.result.then((result) => {
      this.realizeSingleItems(order, result.items);
    }).catch((error) => {
      console.log(error);
    });
  }

  isRealised() {
    return this.status === 'REALISED';
  }

}
