import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../model/product';
import {CategorySelect} from '../model/categorySelect';
import {Observable} from 'rxjs';
import {ProductFilter} from '../model/productFilter';
import {PagerService} from '../pager.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
              private pagerService: PagerService) {
  }

  searchText: string;
  filter: ProductFilter;
  selectedCategories: CategorySelect[] = [];
  filteredProductList: Observable<Product[]>;

  pageSizes: number[] = [3, 5, 8];
  allSize: number;
  pageSize: number;
  pager: any = {};

  ngOnInit() {
    this.pageSize = this.pageSizes[0];
    this.allSize = 6;
    this.selectedCategories.push(new CategorySelect('Odzież', false));
    this.selectedCategories.push(new CategorySelect('Gadget', false));
    this.filter = new ProductFilter(this.searchText, this.selectedCategories, 1, this.pageSize);
    this.productService.getProductsCount(this.filter).subscribe(e => {
      this.allSize = e.size;
      console.log(this.allSize);
    });
    this.filteredProductList = this.productService.getProducts(this.filter);
    this.setPage(1);
  }

  removeEventListener(product) {
    this.productService.removeProduct(product);
  }

  subtractEventListener(product) {
    if (product.amount > 0) {
      product.amount--;
      this.productService.addProduct(product);
    }
  }

  addEventListener(product) {
    product.amount++;
    this.productService.addProduct(product);
  }

  filterProductList() {
    this.updateFilters(this.filter.startIndex, this.filter.endIndex);
    this.filteredProductList = this.productService.getProducts(this.filter);
    this.productService.getProductsCount(this.filter).subscribe(e => this.allSize = e.size);
  }

  refreshPage() {
    if (this.pager.currentPage) {
      this.setPage(this.pager.currentPage);
    } else {
      this.setPage(1);
    }
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allSize, page, this.pageSize);
    console.log(this.pager);
    this.updateFilters(this.pager.startIndex, this.pager.endIndex);
    this.filteredProductList = this.productService.getProducts(this.filter);
  }

  updateFilters(startIndex: number, endIndex: number) {
    this.filter.name = this.searchText;
    this.filter.selectedCategories = this.selectedCategories;
    this.filter.startIndex = startIndex;
    this.filter.endIndex = endIndex;
  }
}
