import { Component, OnInit } from '@angular/core';
import {BasketService} from '../basket.service';
import {ProductCreatorComponent} from '../product-creator/product-creator.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdminLoginComponent} from '../admin-login/admin-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private basketService: BasketService,
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

  openFormModal() {
    const modalRef = this.modalService.open(AdminLoginComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
