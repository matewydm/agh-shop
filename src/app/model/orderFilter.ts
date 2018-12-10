export class OrderFilter {
  isRealised: boolean;
  limit: number;
  constructor(isRealised: boolean, limit: number) {
    this.isRealised = isRealised;
    this.limit = limit;
  }
}

