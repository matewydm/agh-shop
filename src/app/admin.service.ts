import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user: Observable<User>;
  isAuthorized: boolean;

  constructor(private fireAuth: AngularFireAuth) {
    this.user = fireAuth.authState;
    this.user.subscribe(value => {
      this.isAuthorized = value.isAnonymous;
    });
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
}
