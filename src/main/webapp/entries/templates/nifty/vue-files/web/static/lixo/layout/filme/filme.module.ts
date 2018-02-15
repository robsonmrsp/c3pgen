import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {ComponentModule} from '../components/component.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatatableSortDirective} from './../components/core/datatable-sort.directive';
import {FilmeRoutingModule} from './filme-routing.module';
import {PageFilmeComponent} from './page-filme/page-filme.component';
import {FormFilmeComponent} from './form-filme/form-filme.component';
import {GeneroModule} from '../genero/genero.module';
import {ModalFilmeComponent} from './modal-filme/modal-filme.component';

import {MaskDirective} from './../components/core/input-mask.directive';
import {DatetimepickerDirective} from './../components/core/datetime-picker.directive';

import {HttpModule} from '@angular/http';

import {StatModule} from '../../shared';


@NgModule({

  imports: [
    CommonModule,
    //NullInjectorError: No provider for Http!
    HttpModule,
    //mesmo não usando diretamente, é necessário importar para corrigir o problema:
    //Can't bind to 'ngModel' since it isn't a known property of 'input'

    FormsModule,
    ReactiveFormsModule,
    // para evitar o erro: Can't bind to 'routerLink' since it isn't a known property
    FilmeRoutingModule,
    ComponentModule,
    GeneroModule,
  ],
  declarations: [
    PageFilmeComponent,
    FormFilmeComponent,
    ModalFilmeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilmeModule {}
