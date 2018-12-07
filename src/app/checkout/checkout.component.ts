import { Component, OnInit } from '@angular/core';
import {BasketService} from '../basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  getBasket() {
    return this.basketService.getBasket();
  }

}
