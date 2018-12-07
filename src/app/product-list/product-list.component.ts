import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productList = this.productService.getProducts();
  }

  removeEventListener(product) {
    this.productList.splice(this.productList.indexOf(product), 1);
  }
}
