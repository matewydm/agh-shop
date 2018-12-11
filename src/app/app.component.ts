import { Component } from '@angular/core';
import {UserService} from './user.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agh-shop';

}
