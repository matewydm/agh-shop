import { Injectable } from '@angular/core';
import {BasketProduct} from './model/basket';
import {Order} from './model/order';
import {AngularFirestore} from 'angularfire2/firestore';
import {OrderProduct} from './model/orderProduct';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private db: AngularFirestore) { }

  makeOrder(result: any, basket: BasketProduct[], price: number) {
    const orderProduct = basket.map(basketItem => Object.assign({}, new OrderProduct(false, basketItem)));
    const order = new Order(orderProduct, result.id, result.email, result.username, result.address, price);
    this.updateOrder(order);
  }

  updateOrder(order: Order) {
    this.db.collection('/order').doc(order.id).set(Object.assign({}, order))
      .then(function() {
        console.log('Product successfully added:', order);
      });
  }

}
