export class Product {
  id: string;
  name: string;
  link: string;
  price: number;
  category: string;
  description: string;
  constructor(id: string, name: string, link: string, price: number, category: string, description: string) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.price = price;
    this.category = category;
    this.description = description;
  }
}

