import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserData} from '../model/userData';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.css']
})
export class CheckoutConfirmComponent implements OnInit {

  userData: UserData = new UserData();
  form: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('.* .*')]],
      address: ['', [Validators.required, Validators.pattern('ul\. .*')]]
    });
  }

  get c() { return this.form.controls; }

  checkout() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Błędy formularza potwierdzania zamówienia promocji');
      return;
    }
    this.activeModal.close({
      id: this.userData.id,
      email: this.userData.email,
      username: this.userData.username,
      address: this.userData.address
    });
  }
}
