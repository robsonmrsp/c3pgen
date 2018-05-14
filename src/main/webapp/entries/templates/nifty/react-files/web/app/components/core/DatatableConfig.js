export default class DatatableConfig {
  constructor(size = 10) {
    this.page = 1;
    this.pageSize = size;
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
    return Math.trunc((this.totalRecords / this.pageSize) + 1);
  }

  get first() {
    return ((this.page - 1) * this.pageSize) + 1;
  }

  get last() {
    return Math.min(this.page * this.pageSize, this.totalRecords);
  }

  update = (data) => {
    this.totalRecords = data.totalRecords;
    this.items = data.itens;
  }
}
