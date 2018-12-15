export class Promotion {
  percentage?: number;
  expirationDate?: Date;
  constructor(percentage?: number, expirationDate?: Date) {
    this.percentage = percentage;
    this.expirationDate = expirationDate;
  }
}

