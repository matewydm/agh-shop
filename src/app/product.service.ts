import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, CollectionReference, Query, QueryFn} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {ProductFilter} from './model/productFilter';
import {Product} from './model/product';

@Injectable(
  { providedIn: 'root' }
)
export class ProductService implements OnInit {

  constructor(private db: AngularFirestore) { }
  productMap = new Map();

  ngOnInit() {
  }

  async getProduct(id: string) {
    return await this.db.collection('/product').doc(id).ref.get().then();
  }

   getProducts(filter: ProductFilter): Observable<any[]> {
    const db = this.db.collection('/product', ref => this.applyFilters(ref, filter));
    return db.valueChanges();
  }

  getProductsCount(filter: ProductFilter): Observable<any> {
    return this.db.collection('/product', ref => this.applyCountFilters(ref, filter)).get();
  }

  addProduct(product: Product) {
    if (product.promotion) {
      product.promotion = Object.assign({}, product.promotion);
    }
    this.db.collection('/product').doc(product.id).set(Object.assign({}, product))
      .then(function() {
        console.log('Product successfully added:', product);
      });
  }

  removeProduct(product: Product) {
    this.db.collection('/product').doc(product.id).delete()
      .then(function() {
        console.log('Product successfully deleted:', product);
      });
  }

  applyFilters(ref: CollectionReference, filter: ProductFilter): Query {
    let query = ref.orderBy('id');
    if (filter.name) {
      query = query.where('name', '==', filter.name);
    }
    if (filter.selectedCategories.some(e => e.selected) ) {
      console.log(filter.selectedCategories);
      filter.selectedCategories.filter(e => e.selected).forEach(e => {
        query = query.where('category', '==', e.category);
      });
    }
    query = query.startAt(filter.startIndex.toString());
    query = query.endAt(filter.endIndex.toString());
    return query;
  }

  applyCountFilters(ref: CollectionReference, filter: ProductFilter): Query {
    let query = ref.orderBy('id');
    if (filter.name) {
      query = query.where('name', '==', filter.name);
    }
    if (filter.selectedCategories.some(e => e.selected) ) {
      console.log(filter.selectedCategories);
      filter.selectedCategories.filter(e => e.selected).forEach(e => {
        query = query.where('category', '==', e.category);
      });
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
