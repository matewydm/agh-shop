import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { AdminComponent } from './admin/admin.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CheckoutConfirmComponent } from './checkout-confirm/checkout-confirm.component';
import { OrderComponent } from './order/order.component';
import { UserService } from './user.service';
import { RegistrationComponent } from './registration/registration.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PromotionComponent } from './promotion/promotion.component';
import {DlDateTimePickerDateModule} from 'angular-bootstrap-datetimepicker';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {HttpClientModule} from '@angular/common/http';
import {MessageComponent} from './message/message.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const socketIoConfig: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    SocketIoModule.forRoot(socketIoConfig),
    ToastrModule.forRoot(),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    AppRoutingModule,
    DlDateTimePickerDateModule
  ],
  declarations: [
    AppComponent,
    ProductComponent,
    MessageComponent,
    ProductListComponent,
    NavbarComponent,
    FooterComponent,
    CheckoutComponent,
    ProductCreatorComponent,
    AdminComponent,
    UserLoginComponent,
    CheckoutConfirmComponent,
    OrderComponent,
    RegistrationComponent,
    ItemListComponent,
    PromotionComponent
  ],
  providers: [ProductService, UserService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductCreatorComponent,
    UserLoginComponent,
    CheckoutConfirmComponent,
    ItemListComponent,
    PromotionComponent],
  exports: [MessageComponent]
})
export class AppModule { }
