import {CategorySelect} from './categorySelect';

export class ProductFilter {
  name: string;
  selectedCategories: CategorySelect[];
  startIndex: number;
  endIndex: number;
  constructor(name: string, category: CategorySelect[], startIndex: number, endIndex: number) {
    this.name = name;
    this.selectedCategories = category;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }
}

