import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Customer} from '../model/customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string;
  password: string;
  rePassword: string;
  username: string;
  address: string;
  form: FormGroup;
  submitted = false;

  constructor(public userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.pattern(this.password)]],
      username: ['', [Validators.required, Validators.pattern('.* .*')]],
      address: ['', [Validators.required, Validators.pattern('ul\. .*')]]
    });
  }

  get c() { return this.form.controls; }

  register() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('Błędy formularza dodawania produktu');
      return;
    }
    if (this.password === this.rePassword) {
      this.userService.register(new Customer(null, this.email, this.password, this.username, this.address));
    } else {
      console.log('Hasła nie są zgodne');
    }
    this.router.navigate(['/productList']);
  }
}
