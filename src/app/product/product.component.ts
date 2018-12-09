import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/product';
import {BasketService} from '../basket.service';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() remove = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() subtract = new EventEmitter();

  constructor(private basketService: BasketService, private adminService: AdminService) { }

  ngOnInit() {
  }

  addToBasket(product) {
    this.basketService.add(product);
  }

  subtractFromBasket(product) {
    this.basketService.subtract(product);
  }

  subtractFromList(product) {
    this.subtract.emit(product);
  }

  removeFromList(product) {
    this.remove.emit(product);
  }

  addToList(product) {
    this.add.emit(product);
  }

}
