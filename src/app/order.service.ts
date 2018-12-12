import { Injectable } from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {OrderFilter} from './model/orderFilter';
import {Order} from './model/order';
import {OrderProduct} from './model/orderProduct';
import {ProductService} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore,
              private productService: ProductService) { }

  getOrders(filter: OrderFilter): Observable<any[]> {
    const db = this.db.collection('/order', ref => this.applyFilters(ref, filter));
    return db.valueChanges();
  }

  realizeOrder(order: Order) {
    order.items.forEach(item => this.realizeItem(item));
    order.status = 'REALISED';
    this.updateOrder(order);
  }

  realizeSingleOrder(item: OrderProduct, order: Order) {
    this.realizeItem(item);
    order.status = 'IN_PROGRESS';
    const isRealised = order.items.filter(e => !e.isRealised).length === 0;
    if (isRealised) {
      order.status = 'REALISED';
    }
    this.updateOrder(order);
  }

  realizeItem(item: OrderProduct) {
    const orderedAmount = item.orderItem.amount;
    this.productService.getProduct(item.orderItem.product.id).subscribe(p => {
      if (p.amount < orderedAmount) {
        throw new Error('Niedare');
      } else {
        p.amount -= orderedAmount;
        this.productService.addProduct(p);
      }
    });
    item.isRealised = true;
  }

  applyFilters(ref: CollectionReference, filter: OrderFilter): Query {
    let query = ref.orderBy('id');
    query = query.where('status', '==', filter.status);
    if (filter.limit) {
      query = query.limit(filter.limit);
    }
    return query;
  }

  updateOrder(order: Order) {
    this.db.collection('/order').doc(order.id).set(Object.assign({}, order))
      .then(function() {
        console.log('Product successfully added:', order);
      });
  }
}
