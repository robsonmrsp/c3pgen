import { Component, EventEmitter, ViewChild, Input, Output, ElementRef, TemplateRef, OnInit, AfterViewInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { DatatablePageConfig } from '../../components/core/models/datatable-page-config';
import { Genero } from './../genero';
import { GeneroService } from './../genero.service';
import { NgModel } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component( {
    selector: 'app-modal-genero',
    templateUrl: './modal-genero.component.html',
    styleUrls: ['./modal-genero.component.css'],

    providers: [GeneroService]
} )

export class ModalGeneroComponent implements AfterViewInit {

    @ViewChild( "generoModal" ) generoModal: any;


    public searchGenero: Genero = new Genero();
    public datatableConfig: DatatablePageConfig = new DatatablePageConfig();

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() generoChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() genero: Genero;
    //  @Input() ngModel: Genero;

    public show() {
        this.reset( null );
        this.paging( null );
    }

    public chosen( genero: Genero, generoModal: any ) {
        this.genero = genero;
        this.generoChange.emit( genero );
        this.generoModal.hide();
    }
    constructor( private generoService: GeneroService, private modalService: BsModalService ) {
        this.datatableConfig.filterParameters = this.searchGenero;

    }

    public paging( event: any ) {
        this.getPage( event.page );
    }

    public reset( object: any ) {
        this.datatableConfig = new DatatablePageConfig();
        this.datatableConfig.filterParameters = new Genero();
    }

    getPage( pageNumber: any ) {
        this.datatableConfig.config.page = pageNumber || 1;
        this.generoService.getPage( this.datatableConfig ).subscribe(
            ( pager: any ) => {
                this.datatableConfig.pager = pager;
            }, ( err ) => {
                console.log( err );
            }
        );
    }

    ngAfterViewInit(): void {
//        console.log( this.ngModel );
    }
}
