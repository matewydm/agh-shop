import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/product';
import {BasketService} from '../basket.service';
import {UserService} from '../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductCreatorComponent} from '../product-creator/product-creator.component';

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

  constructor(private basketService: BasketService,
              private userService: UserService,
              private modalService: NgbModal) { }

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

  openFormModal(product) {
    const modalRef = this.modalService.open(ProductCreatorComponent);
    modalRef.componentInstance.product = product;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  private isRole(role: string) {
    return this.userService.isRole(role);
  }

}
