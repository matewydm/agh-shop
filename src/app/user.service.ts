import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import {AngularFirestore} from 'angularfire2/firestore';
import {Customer} from './model/customer';
import {UserData} from './model/userData';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<User>;
  userData: Observable<any>;
  isLoggedIn: boolean;
  data: UserData = new UserData();

  constructor(private fireAuth: AngularFireAuth,
              private db: AngularFirestore) {

    this.user = fireAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        console.log('User uid provided', user.uid);
        this.userData = this.getUserData(user.uid);
        this.userData.subscribe(data => {
          console.log('User data got', data);
          if (data) {
            this.data = new UserData(data.id, data.email, data.username, data.address, data.role);
          } else {
            console.log('Not user data provided');
          }
        });
      } else {
        this.isLoggedIn = false;
        this.data = new UserData();
        console.log('Not user uid provided, role not known');
      }
    });
  }

  register(customer: Customer) {
    this.fireAuth.auth.createUserWithEmailAndPassword(customer.email, customer.password)
      .then(value => {
        console.log('Zarejestrowano pomyślnie w Firebase!', value);
        customer.id = value.user.uid;
        this.addUserData(customer);
      })
      .catch(error => {
        console.log('Nie udało się zarejestrować', error.message);
      });
  }

  addUserData(customer: Customer) {
    return this.db.collection('/user').doc(customer.id).set(Object.assign({}, customer))
      .then(value => {
        console.log('Pomyślnie wprowadzono dane użytkownika!', value);
      })
      .catch(error => {
        console.log('Nie udało się wprowadzić danych', error.message);
      });
  }

  signIn(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Zalogowano pomyślnie', value);
      })
      .catch(error => {
        console.log('Nie udało się zalogować', error.message);
      });
  }

  getUserData(userUid: string) {
    return this.db.collection('/user').doc(userUid).valueChanges();
  }

  signOut() {
    this.fireAuth.auth.signOut()
      .then(value => {
        console.log('Wylogowano pomyślnie', value);
      })
      .catch(error => {
        console.log('Nie udało się wylogować', error.message);
      });
  }

  isRole(role: string) {
    if (this.data.role) {
      return this.data.role === role;
    }
    return false;
  }

  isSignedIn() {
    return this.isLoggedIn;
  }

  getSignedInUserData() {
    return this.data;
  }
}
