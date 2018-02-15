export default class DatatableConfig {
  constructor() {
    this.page = 1;
    this.pageSize = 10;
    this.totalRecords = 0;
    this.orderBy = 'id';
    this.order = 'desc';
    this.items = [];
    this.loading = false;
    this.filterParameters = {};
  }

  get totalPages() {
    if (this.totalRecords === 0) {
      return 0;
    }
    return Math.trunc(this.totalRecords / this.pageSize + 1);
  }

  get first() {
    return ((this.page - 1) * this.pageSize) + 1;
  }

  get last() {
    return this.page * this.pageSize;
  }

  update(data) {
    this.totalRecords = data.totalRecords;
    this.items = data.itens;
  }
};
