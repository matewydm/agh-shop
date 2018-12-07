import { Injectable } from '@angular/core';
import {Product} from './model/product';
import {ProductList} from './model/mockProduct';

@Injectable(
  { providedIn: 'root' }
)
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return ProductList;
  }

}
