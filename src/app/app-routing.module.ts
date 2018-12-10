import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {AdminComponent} from './admin/admin.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [
  { path: 'productList', component: ProductListComponent },
  { path: 'adminPanel', component: AdminComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
