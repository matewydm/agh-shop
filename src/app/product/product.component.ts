import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/product';
import {BasketService} from '../basket.service';
import {UserService} from '../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductCreatorComponent} from '../product-creator/product-creator.component';
import {PromotionComponent} from '../promotion/promotion.component';
import {ProductService} from '../product.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() remove = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() promotion = new EventEmitter();
  @Output() subtract = new EventEmitter();

  constructor(private basketService: BasketService,
              private userService: UserService,
              private productService: ProductService,
              private toast: ToastrService,
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
      this.toast.error('Edycja produktu nie powiodła się.');
    });
  }

  openFormPromotionModal(product) {
    const modalRef = this.modalService.open(PromotionComponent);
    modalRef.componentInstance.product = JSON.parse(JSON.stringify(product));
    modalRef.result.then((result) => {
      console.log(result.product);
      this.promotion.emit(result.product);
    }).catch((error) => {
      console.log(error);
      this.toast.error('Nie udało się dodać promocji');
    });
  }

  countPromotionPrice() {
    return this.productService.countPromotionPrice(this.product);
  }

  isPromotionActive() {
    return this.product.promotion != null;
  }

  private isRole(role: string) {
    return this.userService.isRole(role);
  }

}
