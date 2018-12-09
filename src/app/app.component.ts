import { Component } from '@angular/core';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agh-shop';

  constructor(private adminService: AdminService) {}

  isAdmin(): boolean {
    return this.adminService.isAuthorized();
  }
}
