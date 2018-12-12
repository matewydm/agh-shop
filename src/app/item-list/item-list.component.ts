import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderProduct} from '../model/orderProduct';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: OrderProduct[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  updateOrder() {
    this.activeModal.close({
      items: this.items,
    });
  }
}
