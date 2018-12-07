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
      console.log(item);
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
}
