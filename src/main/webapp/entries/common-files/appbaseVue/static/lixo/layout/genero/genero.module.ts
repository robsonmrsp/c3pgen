import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {GeneroRoutingModule} from './genero-routing.module';

import {ComponentModule} from '../components/component.module';

import {ModalGeneroComponent} from './modal-genero/modal-genero.component';

import {HttpModule} from '@angular/http';

import {StatModule} from '../../shared';

@NgModule({

  imports: [
    CommonModule,

    ComponentModule,
    //NullInjectorError: No provider for Http!
    HttpModule,
    //mesmo não usando diretamente, é necessário importar para corrigir o problema:
    //Can't bind to 'ngModel' since it isn't a known property of 'input'

    FormsModule,
    ReactiveFormsModule,
    // para evitar o erro: Can't bind to 'routerLink' since it isn't a known property
    GeneroRoutingModule,
  ],
  declarations: [
    ModalGeneroComponent
  ],
  exports: [ModalGeneroComponent],
})
export class GeneroModule {}
