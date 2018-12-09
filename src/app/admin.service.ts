import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user: any;

  constructor(private auth: AngularFireAuth) { }

  logIn(email: string, password: string) {
    this.auth.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.message);
    });
  }

  changeStateListener() {
    this.auth.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user;
      } else {
        console.log('User signed out');
      }
    });
  }

  isAuthorized(): boolean {
    return this.user;
  }
}
