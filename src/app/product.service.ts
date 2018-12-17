import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {ProductFilter} from './model/productFilter';
import {Product} from './model/product';
import {RestService} from './rest.service';
import {HttpClient} from '@angular/common/http';
import {map, retry} from 'rxjs/internal/operators';
import {Toast, ToastrService} from 'ngx-toastr';

@Injectable(
  { providedIn: 'root' }
)
export class ProductService implements OnInit {

  constructor(private db: AngularFirestore,
              private rest: RestService,
              private toast: ToastrService,
              private http: HttpClient) { }
  productMap = new Map();

  ngOnInit() {
  }

  isPromotionActive(product: Product) {
    if (product.promotion != null &&
        product.promotion.percentage != null &&
        product.promotion.expirationDate != null) {
      if (product.promotion.expirationDate instanceof Date) {
        return product.promotion.expirationDate.getTime() > new Date().getTime();
      }
      const expirationDate: any = product.promotion.expirationDate;
      return expirationDate.seconds > new Date().getTime() / 1000;
    }
    return false;
  }

  countPromotionPrice(product: Product) {
    if (this.isPromotionActive(product)) {
      const price = product.price - (product.price * product.promotion.percentage / 100);
      return Math.round(price * 100) / 100;
    } else {
      return product.price;
    }
  }

  async getProduct(id: string) {
    return await this.db.collection('/product').doc(id).ref.get().then();
  }

  // getProducts(filter: ProductFilter): Observable<any[]> {
  //   const db = this.db.collection('/product', ref => this.applyFilters(ref, filter));
  //   return db.valueChanges();
  // }

  getProducts(filter: ProductFilter): Observable<any> {
    if (!filter.name) {
      filter.name = '';
    }
    const dare = this.http.get(this.rest.endpoint + 'product?' +
      'name=' + filter.name + '&' +
      'categories=' + filter.categories + '&' +
      'limit=' + filter.limit + '&' +
      'startIndex=' + filter.startIndex + '&' +
      'endIndex=' + filter.endIndex
    )
      .pipe(map(this.rest.extractData));
    dare.toPromise().then(e => console.log(e));
    return dare;
  }

  getProductsCount(filter: ProductFilter): Observable<any> {
    return this.db.collection('/product', ref => this.applyCountFilters(ref, filter)).get();
  }

  // addProduct(product: Product) {
  //   if (product.promotion) {
  //     product.promotion = Object.assign({}, product.promotion);
  //   }
  //   this.db.collection('/product').doc(product._id).set(Object.assign({}, product))
  //     .then(function() {
  //       console.log('Product successfully added:', product);
  //     });
  // }

  addProduct(product: Product) {
    if (product.promotion) {
      product.promotion = Object.assign({}, product.promotion);
    }
    const dare = this.http.put(this.rest.endpoint + 'product', product).pipe(
      map(this.rest.extractData));
    dare.toPromise().then(e => console.log(e));
    this.toast.success('Sukces aktualizacji produktu.');
    return dare;
  }

  removeProduct(product: Product) {
    const dare = this.http.delete(this.rest.endpoint + 'product?id=' + product._id).pipe(
      map(this.rest.extractData));
    dare.toPromise().then(e => console.log(e));
    return dare;
  }

  applyFilters(ref: CollectionReference, filter: ProductFilter): Query {
    let query = ref.orderBy('id');
    if (filter.name) {
      query = query.where('name', '==', filter.name);
    }
    return query;
  }

  applyCountFilters(ref: CollectionReference, filter: ProductFilter): Query {
    let query = ref.orderBy('id');
    if (filter.name) {
      query = query.where('name', '==', filter.name);
    }
    return query;
  }

  // getOProducts(): Observable<Product[]> {
  //   return ProductList;
  // }

  // public getData(listPath): Observable<any[]> {
    // return this.db.list(listPath).valueChanges();
  // }
}
