import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {OrderFilter} from '../model/orderFilter';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemListComponent} from '../item-list/item-list.component';
import {OrderProduct} from '../model/orderProduct';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[];
  status: string;
  filter: OrderFilter;

  constructor(private orderService: OrderService,
              private userService: UserService,
              private toast: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.status = 'NOT_REALISED';
    this.filter = new OrderFilter(this.status, null);
    this.orderService.getOrders(this.filter).subscribe(e => {
      this.orders = e;
    });
  }

  getOrderItemNames(order: Order): string {
    return order.items.map(e => e.orderItem.amount + 'x ' + e.orderItem.product.name).join(', ');
  }

  filterStatus(status: string) {
    this.status = status;
    this.filter.status = status;
    this.orderService.getOrders(this.filter).subscribe(e => {
      this.orders = e;
    });
  }

  realizeOrder(order) {
    this.orderService.realizeOrder(order);
    this.orderService.getOrders(this.filter).subscribe(e => {
      this.orders = e;
    });
  }

  realizeSingleItems(order, items) {
    this.orderService.realizeSingleItems(order, items);
    this.orderService.getOrders(this.filter).subscribe(e => {
      this.orders = e;
    });
  }

  openSingleItemModal(order: Order) {
    const modalRef = this.modalService.open(ItemListComponent);
    modalRef.componentInstance.items = JSON.parse(JSON.stringify(order.items));
    modalRef.result.then((result) => {
      this.realizeSingleItems(order, result.items);
    }).catch((error) => {
      console.log(error);
      this.toast.error('Aktualizacja zamówienia nie została dokonana.');
    });
  }

  isRealised() {
    return this.status === 'REALISED';
  }

  private isRole(role: string) {
    return this.userService.isRole(role);
  }

}
