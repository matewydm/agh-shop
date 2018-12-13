import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Promotion} from '../model/promotion';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  product: Product;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.product.promotion = new Promotion();
  }

  addPromotion() {
    this.activeModal.close({
      product: this.product
    });
  }
}
