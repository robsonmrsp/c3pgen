import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmeService} from './../filme.service';
import {ViewMessage} from './../../components/core/view-message';
//import { ModalGeneroComponent } from '../../genero/modal-genero/modal-genero.component';
import {routerTransition} from '../../../router.animations';

import {Filme} from './../filme';

@Component({
  selector: 'app-form-filme',
  templateUrl: './form-filme.component.html',
  styleUrls: ['./form-filme.component.css'],
  animations: [routerTransition()],
  providers: [FilmeService],
})

export class FormFilmeComponent implements OnInit, AfterViewInit {
  public filme: Filme = new Filme();

  public viewMessage: ViewMessage = new ViewMessage();

  constructor(private route: ActivatedRoute, private filmeService: FilmeService) {}

  save() {
    this.filmeService.save(this.filme).subscribe(
      (filme: Filme) => {
        this.filme = filme;
        this.viewMessage = new ViewMessage("success", "Filme Salvo com sucesso");
        console.log(filme);
      }, (err) => {
        this.viewMessage = new ViewMessage("error", "Problema ao salvar Filme [ " + err.legalMessage + " ]");
        console.log(err);
      }
    )
  }

  ngAfterViewInit(): void {
    var id = this.route.snapshot.params['id'];
    var that = this;
    if (id) {
      this.filmeService.getOne(id).subscribe(
        (filme: Filme) => {
          this.filme = filme;
        }, (err) => {
          console.log(err);
        }
      )
    }
  }

  ngOnInit() {

  }
}
