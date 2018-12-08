import { Component, OnInit } from '@angular/core';
import {BasketService} from '../basket.service';
import {BasketProduct} from '../model/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  getBasket() {
    return this.basketService.getBasket();
  }

  getFullItemPrice(item) {
    return this.basketService.getFullItemPrice(item);
  }

  removeItemFromBasket(item) {
    this.basketService.removeItem(item);
  }

  addProductToBasket(product) {
    this.basketService.add(product);
  }

  removeProductFromBasket(product) {
    this.basketService.subtract(product);
  }

  getOrderPrice() {
    return this.basketService.getOrderPrice();
  }

}
