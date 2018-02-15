import { Component, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';
import { DatatablePageConfig } from '../../components/core/models/datatable-page-config';
import { Filme } from './../filme';
import { FilmeService } from './../filme.service';

@Component( {
    selector: 'app-modal-filme',
    templateUrl: './modal-filme.component.html',
    styleUrls: ['./modal-filme.component.css'],
    providers: [FilmeService]

} )
export class ModalFilmeComponent {

    public datatableConfig: DatatablePageConfig = new DatatablePageConfig();

    @Output() chosenEvent: EventEmitter<Filme> = new EventEmitter( true );

    public show() {
        this.reset( null );
        this.paging( null );
        //$( this.element.nativeElement ).find( '.modal' )['modal']( 'show' );
    }

    public chosen( filme: Filme ) {
        this.chosenEvent.emit( filme );
    }

    public hide() {
        //somente para evitar a necessidade de criar o metodo modal no typings;
        //$( this.element.nativeElement ).find( '.modal' )['modal']( 'hide' );
    }

    constructor( private element: ElementRef, private filmeService: FilmeService ) {
        this.datatableConfig.filterParameters = { nome: '', descricao: '' };
    }

    /**
     * Esse método será executado como o searchFilme o é no backbone
     */
    public paging( object: any ) {
        this.getPageFilmes();
    }

    public reset( object: any ) {
        this.datatableConfig = new DatatablePageConfig();
        this.datatableConfig.filterParameters = { nome: '', descricao: '' };
    }

    getPageFilmes() {
        var that = this;
        this.filmeService.getPage( this.datatableConfig )
        //            function( pager: any ) {
        //                that.datatableConfig.page = pager;
        //            },
        //
        //            function( error: any ) {
        //                console.log( error )
        //            })
    }
}
