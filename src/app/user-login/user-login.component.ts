import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  email: string;
  password: string;
  submitted = false;
  isLoggedIn = false;

  constructor(public activeModal: NgbActiveModal,
              private adminService: UserService) { }

  ngOnInit() {
    return this.isLoggedIn = this.adminService.isSignedIn();
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  signIn() {
    this.adminService.signIn(this.email, this.password);
    // if (this.isLoggedIn) {
      this.activeModal.close();
    // }
    this.submitted = true;
  }

}
