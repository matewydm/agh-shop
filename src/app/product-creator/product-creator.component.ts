import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../model/product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css']
})
export class ProductCreatorComponent implements OnInit {

  product: Product = new Product();

  constructor(public activeModal: NgbActiveModal,
              private productService: ProductService) { }

  ngOnInit() {
  }

  createProduct() {
    this.productService.addProduct(this.product);
    this.activeModal.close();
  }
}
