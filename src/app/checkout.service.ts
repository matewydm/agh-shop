import { Injectable } from '@angular/core';
import {BasketProduct} from './model/basket';
import {Order} from './model/order';
import {AngularFirestore} from 'angularfire2/firestore';
import {OrderProduct} from './model/orderProduct';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private db: AngularFirestore,
              private rest: RestService,
              private http: HttpClient) { }

  makeOrder(result: any, basket: BasketProduct[], price: number) {
    const orderProduct = basket.map(basketItem => Object.assign({}, new OrderProduct(false, basketItem)));
    const order = new Order(orderProduct, result.id, result.email, result.username, result.address, price);
    order.items.forEach(item => item.orderItem.product.promotion = null);
    this.updateOrder(order);
  }

  updateOrder(order: Order) {
    const dare = this.http.put(this.rest.endpoint + 'order', order).pipe(
      map(this.rest.extractData));
    dare.toPromise().then(e => console.log(e));
    return dare;
  }

}
