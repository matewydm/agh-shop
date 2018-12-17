import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../model/product';
import {ProductFilter} from '../model/productFilter';
import {PagerService} from '../pager.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
              private toast: ToastrService,
              private pagerService: PagerService) {
  }

  searchText: string;
  filter: ProductFilter;
  categories: String[] = [];
  selectedCategories: String[] = [];
  filteredProductList: Product[];

  pageSizes: number[] = [3, 6, 9];
  allSize: number;
  pageSize: number;
  pager: any = {};

  ngOnInit() {
    this.pageSize = this.pageSizes[0];
    this.allSize = 6;
    this.categories.push('Odzież');
    this.categories.push('Gadget');
    this.filter = new ProductFilter(this.searchText, [], this.pageSize, 0, this.pageSize-1);
    this.getProducts();
    this.setPage(1);
  }

  getProducts() {
    this.productService.getProducts(this.filter).subscribe(e => {
      this.filteredProductList = this.additionalFiltering(e);
      this.allSize = e.length;
    });
  }

  removeEventListener(product) {
    this.productService.removeProduct(product);
  }

  subtractEventListener(product) {
    if (product.amount > 0) {
      product.amount--;
      this.productService.addProduct(product);
      this.getProducts();
    } else {
      this.toast.error('Nie można zmniejszyć dostępności', 'Brak towaru na stanie');
    }
  }

  addEventListener(product) {
    product.amount++;
    this.productService.addProduct(product);
    this.getProducts();
  }

  promotionEventListener(product) {
    this.productService.addProduct(product);
    this.getProducts();
  }

  filterProductList() {
    this.updateFilters(this.filter.startIndex, this.filter.endIndex);
    this.getProducts();
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
    this.getProducts();
  }

  updateFilters(startIndex: number, endIndex: number) {
    this.filter.name = this.searchText;
    this.filter.categories = this.selectedCategories;
    this.filter.startIndex = startIndex;
    this.filter.endIndex = endIndex;
  }

  private additionalFiltering(products: Product[]) {
    if (this.selectedCategories.length > 0) {
      products = products.filter(p =>
        this.selectedCategories.indexOf(p.category) > -1
      );
    }
    products = products.slice(this.filter.startIndex, this.filter.endIndex + 1);
    return products;
  }
}
