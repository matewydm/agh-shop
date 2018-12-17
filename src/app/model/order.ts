import {OrderProduct} from './orderProduct';

export class Order {
  _id: string;
  items: OrderProduct[];
  userId: string;
  email: string;
  username: string;
  address: string;
  price: number;
  status: string;
  constructor(items: OrderProduct[],
              userId: string,
              email: string,
              username: string,
              address: string,
              price: number) {
    this._id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.items = items;
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.address = address;
    this.price = price;
    this.status = 'NOT_REALISED';
  }
}

