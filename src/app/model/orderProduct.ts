import {BasketProduct} from './basket';

export class OrderProduct {
  isRealised: boolean;
  orderItem: BasketProduct;
  constructor(isRealised: boolean, orderItem: BasketProduct) {
    this.isRealised = isRealised;
    this.orderItem = orderItem;
  }
}

