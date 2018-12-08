import { Injectable } from '@angular/core';
import {Product} from './model/product';
import {BasketProduct} from './model/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }

  getBasket(): BasketProduct[] {
    const item = localStorage.getItem('basket');
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  }

  add(product: Product) {
    const basket = this.getBasket();
    let isStored = false;
    for (const item of basket) {
      if (item.product.id === product.id) {
        item.amount++;
        isStored = true;
      }
    }
    if (!isStored) {
      const basketProduct = new BasketProduct(1, product);
      basket.push(basketProduct);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  subtract(product: Product) {
    const basket = this.getBasket();
    let isStored = false;
    for (const item of basket) {
      if (item.product.id === product.id) {
        if (item.amount === 1) {
          basket.splice(basket.indexOf(item), 1);
        }
        item.amount--;
        isStored = true;
      }
    }
    if (!isStored) {
      console.log('No ogarnij, najpierw dodaj jak chcesz usuwać');
    }
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  removeItem(item: BasketProduct) {
    const basket = this.getBasket();
    basket.splice(basket.indexOf(item), 1);
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  getFullItemPrice(item) {
    const fullPrice = item.amount * item.product.price;
    return Math.round(fullPrice * 100) / 100;
  }

  getOrderPrice() {
    const basket = this.getBasket();
    let orderPrice = 0;
    for (const item of basket) {
      orderPrice += this.getFullItemPrice(item);
    }
    return Math.round(orderPrice * 100) / 100;
  }
}
