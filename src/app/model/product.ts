export class Product {
  id: string;
  name: string;
  link: string;
  price: number;
  category: string;
  description: string;
  amount: number;
  constructor(id: string, name: string, link: string, price: number, category: string, description: string, amount: number) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.price = price;
    this.category = category;
    this.description = description;
    this.amount = amount;
  }
}

