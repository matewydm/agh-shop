import { Component, OnInit } from '@angular/core';
import {BasketService} from '../basket.service';
import {ProductCreatorComponent} from '../product-creator/product-creator.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserLoginComponent} from '../user-login/user-login.component';
import {UserService} from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private basketService: BasketService,
              private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  countBasketAmount() {
    let amount = 0;
    const basket = this.basketService.getBasket();
    for (const item of basket) {
      amount = amount + item.amount;
    }
    return amount;
  }

  openLoginModal() {
    const modalRef = this.modalService.open(UserLoginComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  private isRole(role: string) {
    return this.userService.isRole(role);
  }

  private isSignedIn() {
    return this.userService.isSignedIn();
  }

  private signOut() {
    return this.userService.signOut();
  }
}
