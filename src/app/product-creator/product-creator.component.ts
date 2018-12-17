import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../model/product';
import {ProductService} from '../product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css']
})
export class ProductCreatorComponent implements OnInit {

  product: Product = new Product();
  form: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private productService: ProductService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      link: ['', [Validators.required, Validators.pattern('http://.*')]],
      price: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get c() { return this.form.controls; }

  createProduct() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Błędy formularza dodawania produktu');
      return;
    }
    this.productService.addProduct(this.product);
    this.activeModal.close();
  }
}
