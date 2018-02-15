import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatatablePageConfig} from '../../components/core/models/datatable-page-config';
import {FilmeService} from '../filme.service'
import {routerTransition} from '../../../router.animations';

@Component({
  selector: 'app-page-filme',
  templateUrl: './page-filme.component.html',
  styleUrls: ['./page-filme.component.css'],
  providers: [FilmeService],

  animations: [routerTransition()]
})

export class PageFilmeComponent implements OnInit, AfterViewInit {

  public showAdvanceSearch: Boolean = false;

  public datatableConfig: DatatablePageConfig = new DatatablePageConfig(10);

  constructor(private filmeService: FilmeService, private router: Router) {

    this.datatableConfig.filterParameters = {nome: '', descricao: ''};
  }

  paging(event: any) {
    this.getPage(event.page);
  }

  reset(object: any) {

    this.datatableConfig = new DatatablePageConfig(10);
    this.datatableConfig.filterParameters = {name: '', title: ''};
  }

  getPage(pageNumber: any) {
    this.datatableConfig.config.page = pageNumber || 1;
    this.filmeService.getPage(this.datatableConfig).subscribe(
      (pager: any) => {
        this.datatableConfig.pager = pager;
      }, (err) => {
        console.log(err);
      }
    );
  }

  editFilme(filme: any) {
    this.router.navigate(['/filme/edit/' + filme.id]);
  }

  removeFilme(filme: any) {
    this.filmeService.remove(filme.id).subscribe(
      (done: Boolean) => {
        console.log(done);
      }, (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.paging(1);
  }

  ngAfterViewInit(): void {

  }

}
