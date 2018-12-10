import { Injectable } from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {OrderFilter} from './model/orderFilter';
import {Order} from './model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  getOrders(filter: OrderFilter): Observable<any[]> {
    const db = this.db.collection('/order', ref => this.applyFilters(ref, filter));
    return db.valueChanges();
  }

  realizeOrder(order: Order) {
    order.isRealised = true;
    this.updateOrder(order);
  }

  applyFilters(ref: CollectionReference, filter: OrderFilter): Query {
    let query = ref.orderBy('id');
    query = query.where('isRealised', '==', filter.isRealised);
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
