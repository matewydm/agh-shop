import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserData} from '../model/userData';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.css']
})
export class CheckoutConfirmComponent implements OnInit {

  userData: UserData = new UserData();

  constructor(public activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
  }

  checkout() {
    this.activeModal.close({
      id: this.userData.id,
      email: this.userData.email,
      username: this.userData.username,
      address: this.userData.address
    });
  }
}
