export class ProductFilter {
  name: string;
  categories: String[];
  limit: number;
  startIndex: number;
  endIndex: number;
  constructor(name: string, categories: String[], limit: number, startIndex: number, endIndex: number) {
    this.name = name;
    this.categories = categories;
    this.limit = limit;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }
}

