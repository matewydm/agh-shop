import {Product} from './product';

export class BasketProduct {
  amount: number;
  product: Product;
  constructor(amount: number, product: Product) {
    this.amount = amount;
    this.product = product;
  }
}

