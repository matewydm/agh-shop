import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Promotion} from '../model/promotion';
import {Timestamp} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  product: Product;
  form: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
              private toast: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.product.promotion = new Promotion();
    this.form = this.formBuilder.group({
      percentage: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      expirationDate: ['', [Validators.required, Validators.min(new Date().getTime() + 180000)]]
    });
  }

  get c() { return this.form.controls; }

  addPromotion() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toast.error('Wystąpiły błędy formularza dodawania promocji.');
      console.log('Błędy formularza dodawania promocji');
      return;
    }
    this.activeModal.close({
      product: this.product
    });
  }
}
