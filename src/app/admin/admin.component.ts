import { Component, OnInit } from '@angular/core';
import {ProductCreatorComponent} from '../product-creator/product-creator.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private toast: ToastrService,
              private userService: UserService) { }

  ngOnInit() {
  }

  private isRole(role: string) {
    return this.userService.isRole(role);
  }

  openFormModal() {
    const modalRef = this.modalService.open(ProductCreatorComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
      this.toast.error('Dodawanie produktu nie powiodło się.');
    });
  }


}
