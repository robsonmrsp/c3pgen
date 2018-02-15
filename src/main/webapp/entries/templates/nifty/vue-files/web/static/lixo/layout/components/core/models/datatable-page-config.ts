
export class Pager {
  public items: any[] = [];
  public actualPage: number = 1;
  public totalRecords: number = 0;

}
export class Config {
  public page: number = 1;
  public pageSize: number = 5;
  public totalPages: number = 1;
  public orderBy: String = 'id';
  public direction: String = 'desc';



  get last() {
    return (this.page) * this.pageSize;
  }
  get first() {

    return (this.page - 1) * this.pageSize + 1;
  }
}

export class DatatablePageConfig {
  public pager: Pager = new Pager();
  public loading: boolean = false;
  public config: Config = new Config();
  public filterParameters: any;

  constructor(pageSize: number = 5) {
    this.config.pageSize = pageSize;
  }
}
