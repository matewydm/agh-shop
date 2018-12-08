import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../model/product';
import {CategorySelect} from '../model/categorySelect';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchText: String;
  selectedCategories: CategorySelect[] = [];
  productList = [];
  filteredProductList = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productList = this.productService.getProducts();
    this.filteredProductList = this.productService.getProducts();
    this.selectedCategories.push(new CategorySelect('Odzież', false));
    this.selectedCategories.push(new CategorySelect('Gadget', false));
  }

  removeEventListener(product) {
    this.productList.splice(this.productList.indexOf(product), 1);
  }

  filterProductList() {
    this.filteredProductList = Object.assign([], this.productList).filter(
      product => this.isTextIncluded(product) && this.isCategorySelected(product)
    );
  }

  isTextIncluded(product) {
    return (!this.searchText) || product.name.toLowerCase().includes(this.searchText.toLowerCase());
  }

  isCategorySelected(product) {
    return !this.selectedCategories.some(e => e.selected) ||
           this.selectedCategories.some(e => e.category === product.category && e.selected);
  }

  changeSelection(category: CategorySelect) {
    this.filterProductList();
  }
}
