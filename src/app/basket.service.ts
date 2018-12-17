import { Injectable } from '@angular/core';
import {Product} from './model/product';
import {BasketProduct} from './model/basket';
import {ProductService} from './product.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private toast: ToastrService) { }

  getBasket(): BasketProduct[] {
    const item = localStorage.getItem('basket');
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  }

  emptyBasket() {
    localStorage.removeItem('basket');
  }

  add(product: Product) {
    const basket = this.getBasket();
    let isStored = false;
    for (const item of basket) {
      if (item.product._id === product._id) {
        isStored = true;
        if (item.amount + 1 <= item.product.amount) {
          item.amount++;
        } else {
          this.toast.warning('Produkt jest już niedostępny');
          console.log('Produkt jest już niedostępny');
        }
      }
    }
    if (!isStored && product.amount >= 1) {
      const basketProduct = new BasketProduct(1, product);
      basket.push(basketProduct);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  subtract(product: Product) {
    const basket = this.getBasket();
    let isStored = false;
    for (const item of basket) {
      if (item.product._id === product._id) {
        if (item.amount === 1) {
          basket.splice(basket.indexOf(item), 1);
        }
        item.amount--;
        isStored = true;
      }
    }
    if (!isStored) {
      this.toast.warning('Dodaj produkt zanim go usuniesz');
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
