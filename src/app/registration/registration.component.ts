import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../user.service';
import {Customer} from '../model/customer';

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

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  register() {
    if (this.password === this.rePassword) {
      this.userService.register(new Customer(null, this.email, this.password, this.username, this.address));
    } else {
      console.log('Hasła nie są zgodne');
    }
  }
}
