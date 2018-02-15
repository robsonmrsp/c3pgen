import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

//TODO Alterar a localização das diretivas, por em um local mais central
import {DatatableSortDirective} from '../components/core/datatable-sort.directive';
import {MaskDirective} from '../components/core/input-mask.directive';
import {DatetimepickerDirective} from '../components/core/datetime-picker.directive';

//Para o import de bootstrap.
import {ModalModule} from 'ngx-bootstrap';
import {PaginationModule} from 'ngx-bootstrap';
import {CollapseModule} from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
  ],
  declarations: [
    DatatableSortDirective,
    MaskDirective,
    DatetimepickerDirective
  ],
  exports: [
    DatatableSortDirective,
    MaskDirective,
    DatetimepickerDirective,
    ModalModule,
    PaginationModule,
    CollapseModule]
})
export class ComponentModule {}
