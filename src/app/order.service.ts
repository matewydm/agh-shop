import { Injectable } from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {OrderFilter} from './model/orderFilter';
import {Order} from './model/order';
import {OrderProduct} from './model/orderProduct';
import {ProductService} from './product.service';
import {Product} from './model/product';

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

  async realizeOrder(order: Order) {
    order.status = 'IN_PROGRESS';
    this.updateOrder(order);
    console.log('Przyjęto do realizacji.');
    let isError = false;
    await this.realizeItems(order.items)
      .then(() => {
        console.log('Nie wykryto błędów, realizowanie zamówienia.');
        order.status = 'REALISED';
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

  async realizePartialOrder(order: Order, items: OrderProduct[]) {
    order.status = 'IN_PROGRESS';
    this.updateOrder(order);
    console.log('Przyjęto do realizacji.');
    let isError = false;
    order.items = items;
    const realisedItems = order.items.filter(item => item.isRealised);
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

  async realizeSingleItems(order: Order, items: OrderProduct[]) {
    let isError = false;
    const isAnyNotRealised = items.filter(item => item.isRealised === false).length > 0;
    if (!isAnyNotRealised) {
      await this.realizeOrder(order).catch(e => {
        isError = true;
      });
    } else {
      await this.realizePartialOrder(order, items).catch(e => {
        isError = true;
      });
    }
    if (isError) {
      throw new Error('Częściowe zamówienie nie zostało zrealizowane');
    }
  }

  async realizeItems(items): Promise<boolean> {
    let isError = false;
    await Promise.all(items.forEach(async item => {
      await this.realizeItem(item).catch(() => {
        isError = true;
      });
    }));
    return isError;
  }

  async realizeItem(item: OrderProduct) {
    const orderedAmount = item.orderItem.amount;
    let isError = false;
    await this.productService.getProduct(item.orderItem.product.id).then(p => {
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
    this.db.collection('/order').doc(order.id).set(Object.assign({}, order))
      .then(function() {
        console.log('Zamówienie pomyślnie zaktualizowane:', order);
      });
  }
}
