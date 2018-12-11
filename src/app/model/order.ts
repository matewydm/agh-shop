import {BasketProduct} from './basket';

export class Order {
  id: string;
  items: BasketProduct[];
  userId: string;
  email: string;
  username: string;
  address: string;
  price: number;
  isRealised: boolean;
  constructor(items: BasketProduct[],
              userId: string,
              email: string,
              username: string,
              address: string,
              price: number) {
    this.id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.items = items;
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.address = address;
    this.price = price;
    this.isRealised = false;
  }
}

