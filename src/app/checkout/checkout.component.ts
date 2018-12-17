import { Component, OnInit } from '@angular/core';
import {BasketService} from '../basket.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CheckoutConfirmComponent} from '../checkout-confirm/checkout-confirm.component';
import {CheckoutService} from '../checkout.service';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private basketService: BasketService,
              private checkoutService: CheckoutService,
              private userService: UserService,
              private toast: ToastrService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  getBasket() {
    return this.basketService.getBasket();
  }

  getFullItemPrice(item) {
    return this.basketService.getFullItemPrice(item);
  }

  removeItemFromBasket(item) {
    this.basketService.removeItem(item);
  }

  addProductToBasket(product) {
    this.basketService.add(product);
  }

  removeProductFromBasket(product) {
    this.basketService.subtract(product);
  }

  getOrderPrice() {
    return this.basketService.getOrderPrice();
  }

  openFormModal() {
    const modalRef = this.modalService.open(CheckoutConfirmComponent);
    modalRef.componentInstance.userData = this.userService.getSignedInUserData();
    modalRef.result.then((result) => {
      this.finishCheckout(result);
    }).catch((error) => {
      console.log(error);
      this.toast.error('Potwierdzenie zamówienia nie powiodło się.');
    });
  }

  finishCheckout(result) {
    this.checkoutService.makeOrder(result, this.getBasket(), this.getOrderPrice());
    this.basketService.emptyBasket();
    this.toast.success('Potwierdzenie zakupu dokonane.');
    this.router.navigate(['/productList']);
  }
}
