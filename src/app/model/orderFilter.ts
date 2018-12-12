export class OrderFilter {
  status: string;
  limit: number;
  constructor(status: string, limit: number) {
    this.status = status;
    this.limit = limit;
  }
}

