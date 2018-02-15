import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageFilmeComponent } from './page-filme/page-filme.component';
import { FormFilmeComponent } from './form-filme/form-filme.component';

const routes: Routes = [
    {
        path: 'page', component: PageFilmeComponent
    }, {
        path: 'new', component: FormFilmeComponent,
    }, {
        path: 'edit/:id', component: FormFilmeComponent,
    }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
} )
export class FilmeRoutingModule {
}

