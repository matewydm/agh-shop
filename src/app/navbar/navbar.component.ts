import { Component, OnInit } from '@angular/core';
import {BasketService} from '../basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private basketService: BasketService) { }

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
}
