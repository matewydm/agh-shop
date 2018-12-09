import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/product';
import {BasketService} from '../basket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() remove = new EventEmitter();

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  addToBasket(product) {
    this.basketService.add(product);
  }

  subtractFromBasket(product) {
    this.basketService.subtract(product);
  }

  removeFromList(product) {
    this.remove.emit(product);
  }

  addToList (product) {
    this.remove.emit(product);
  }

}
