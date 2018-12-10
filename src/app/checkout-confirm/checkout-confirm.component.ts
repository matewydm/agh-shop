import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../product.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../model/product';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.css']
})
export class CheckoutConfirmComponent implements OnInit {

  username: string;
  address: string;

  constructor(public activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
  }

  checkout() {
    this.activeModal.close({
      username: this.username,
      address: this.address
    });
  }
}
