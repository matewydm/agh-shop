import { Injectable } from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {OrderFilter} from './model/orderFilter';
import {Order} from './model/order';
import {OrderProduct} from './model/orderProduct';
import {ProductService} from './product.service';
import {Product} from './model/product';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore,
              private http: HttpClient,
              private rest: RestService,
              private toast: ToastrService,
              private productService: ProductService) { }

  getOrders(filter: OrderFilter): Observable<any> {
    const dare = this.http.get(this.rest.endpoint + 'order?status=' + filter.status)
      .pipe(map(this.rest.extractData));
    dare.toPromise().then(e => console.log(e));
    return dare;
  }

  realizeOrder(order: Order) {
    const dare = this.http.post(this.rest.endpoint + 'order/realize', order)
      .pipe(map(this.rest.extractData));
    dare.toPromise()
      .then(e => {
        this.toast.success('Zamówienie zrealizowane');
        console.log(e);
      })
      .catch(e => {
        console.log('Zamówienie nie zostało zrealizowane');
      });
    return dare;
  }

  realizeSingleItems(order: Order, items: OrderProduct[]) {
    const dare = this.http.post(this.rest.endpoint + 'order/realize/part?id=' + order._id, items)
      .pipe(map(this.rest.extractData));
    dare.toPromise()
      .then(e => {
        this.toast.success('Zamówienie zaktualizowane');
        console.log(e);
      })
      .catch(e => {
        console.log('Zamówienie częściowe nie zostało zrealizowane');
      });
    return dare;
  }

  // async realizeOrder(order: Order) {
  //   order.status = 'IN_PROGRESS';
  //   this.updateOrder(order);
  //   console.log('Przyjęto do realizacji.');
  //   let isError = false;
  //   await this.realizeItems(order.items)
  //     .then(() => {
  //       console.log('Nie wykryto błędów, realizowanie zamówienia.');
  //       order.status = 'REALISED';
  //       this.updateOrder(order);
  //     })
  //     .catch(e => {
  //       console.log('Wykryto błąd', e);
  //       isError = true;
  //     });
  //   if (isError) {
  //     throw new Error('Zamówienie nie zostało zrealizowane');
  //   }
  // }

  async realizePartialOrder(order: Order, items: OrderProduct[]) {
    order.status = 'IN_PROGRESS';
    this.updateOrder(order);
    console.log('Przyjęto do realizacji.');
    let isError = false;
    order.items = items;
    const realisedItems: OrderProduct[] = order.items.filter(item => !item.isRealised);
    console.log(realisedItems);
    await this.realizeItems(realisedItems)
      .then(() => {
        console.log('Nie wykryto błędów, realizowanie częsciowe zamówienia.');
        this.updateOrder(order);
      })
      .catch(e => {
        console.log('Wykryto błąd');
        isError = true;
      });
    if (isError) {
      throw new Error('Zamówienie nie zostało zrealizowane');
    }
  }

  // async realizeSingleItems(order: Order, items: OrderProduct[]) {
  //   let isError = false;
  //   const isAnyNotRealised = items.filter(item => item.isRealised === false).length > 0;
  //   if (!isAnyNotRealised) {
  //     await this.realizeOrder(order);
  //   } else {
  //     await this.realizePartialOrder(order, items).catch(e => {
  //       isError = true;
  //     });
  //   }
  //   if (isError) {
  //     throw new Error('Częściowe zamówienie nie zostało zrealizowane');
  //   }
  // }

  async realizeItems(items: OrderProduct[]): Promise<boolean> {
    let isError = false;
    if (items != null && items.length != null) {
      await Promise.all(items.map(async item => {
        await this.realizeItem(item).catch(() => {
          isError = true;
        });
      }));
    }
    return isError;
  }

  async realizeItem(item: OrderProduct) {
    const orderedAmount = item.orderItem.amount;
    let isError = false;
    await this.productService.getProduct(item.orderItem.product._id).then(p => {
      if (p.exists) {
        const product = p.data() as Product;
        if (product.amount < orderedAmount) {
          console.log('Produkt niedostępny...');
          isError = true;
        } else {
          console.log('Produkt dostępny - aktualizacja');
          product.amount -= orderedAmount;
          this.productService.addProduct(product);
          item.isRealised = true;
        }
      }
    });
    if (isError) {
      throw new Error('Produktu brakuje na stanie');
    }
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
    this.db.collection('/order').doc(order._id).set(Object.assign({}, order))
      .then(function() {
        console.log('Zamówienie pomyślnie zaktualizowane:', order);
      });
  }
}
