import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {${firstUpper(entity.name)}Service} from './../${kebabCase(entity.name)}.service';
import {NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateFRParserFormatter} from '../../components/core/ngb-date-fr-parser-formatter';


import {${firstUpper(entity.name)}} from './../${kebabCase(entity.name)}';
@Component({
  selector: 'app-form-${kebabCase(entity.name)}',
  templateUrl: './form-${kebabCase(entity.name)}.component.html',
  styleUrls: ['./form-${kebabCase(entity.name)}.component.css'],
  providers: [${firstUpper(entity.name)}Service, {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class Form${firstUpper(entity.name)}Component implements OnInit, AfterViewInit {

  public ${firstLower(entity.name)}: ${firstUpper(entity.name)} = new ${firstUpper(entity.name)}();

  closeResult: string;
  sub: any;

  constructor(private route: ActivatedRoute, private ${firstLower(entity.name)}Service: ${firstUpper(entity.name)}Service) {}

  save() {

    this.${firstLower(entity.name)}Service.save(this.${firstLower(entity.name)},
      function success(${firstLower(entity.name)}: any) {
        console.log(${firstLower(entity.name)})
      },
      function error(erro: any) {
        console.log(erro)
      })
  }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    var that = this;

    //duas maneiras distintas de obter os parametros.
    this.sub = this.route.params.subscribe(params => console.log(params))
  }

  ngAfterViewInit(): void {
    var id = this.route.snapshot.params['id'];
    var that = this;
    if (id) {
      this.${firstLower(entity.name)}Service.get(id,
        function success(${firstLower(entity.name)}: any) {
          that.${firstLower(entity.name)} = ${firstLower(entity.name)};
        },
        function error(erro: any) {
          console.log(erro)
        })
    }
  }
}
