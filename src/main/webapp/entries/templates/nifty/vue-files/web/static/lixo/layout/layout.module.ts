import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';

import {ComponentModule} from './components/component.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    ComponentModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent]
})
export class LayoutModule {}
