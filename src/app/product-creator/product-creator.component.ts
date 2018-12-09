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

  id: string;
  name: string;
  link: string;
  price: number;
  category: string;
  description: string;

  constructor(public activeModal: NgbActiveModal, private productService: ProductService) { }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
  }

  createProduct() {
    this.productService.addProduct(new Product(this.id, this.name, this.link, this.price, this.category, this.description));
    this.activeModal.close();
  }
}
