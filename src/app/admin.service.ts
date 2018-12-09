import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user: Observable<User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user = fireAuth.authState;
  }

  logIn(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
      })
      .catch(error => {
        console.log('Something went wrong:', error.message);
      });
  }

  isAuthorized(): boolean {
    return this.user;
  }
}
