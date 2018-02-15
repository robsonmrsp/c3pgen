import { Directive, ElementRef, Renderer, EventEmitter, Output, HostListener, Input, AfterViewInit } from '@angular/core';

import { DatatablePageConfig, Pager, Config } from './models/datatable-page-config';

@Directive( {
    selector: '[appDatatableSort]'
} )
export class DatatableSortDirective implements AfterViewInit {

    @Output() public sortChanged: EventEmitter<any> = new EventEmitter();
    @Input( "sortConfig" ) public sortConfig: Config;
    @Input() public sortName: string = '';
    direction: string = '';

    constructor( private el: ElementRef, private render: Renderer ) {
    }

    ngAfterViewInit() {

    }

    @Input()
    public get config(): Config {
        return this.sortConfig;
    }

    public set config( value: Config ) {
        this.sortConfig = value;
    }


    @HostListener( 'click', ['$event'] )
    public onToggleSort( event: any ): void {

        if ( event ) {
            event.preventDefault();
        }
        let icon = this.el.nativeElement.querySelector( 'i' );

        let allIcons = this.el.nativeElement.parentElement.parentElement.querySelectorAll( 'i' );
        allIcons.forEach( function( ico ) {
            //            ico.className = "fa fa-arrows-v"
            ico.className = ""
        } )
        switch ( this.direction ) {
            case 'asc':
                this.direction = 'desc';
                this.config.direction = 'desc';
                this.config.orderBy = this.sortName;
                icon.className = "fa fa-sort-alpha-desc"
                break;
            case 'desc':
                this.direction = '';
                this.config.direction = '';
                this.config.orderBy = '';
                //                icon.className = "fa fa-arrows-v"
                icon.className = ""
                break;
            default:
                this.direction = 'asc';
                this.config.direction = 'asc';
                this.config.orderBy = this.sortName;
                icon.className = "fa fa-sort-alpha-asc"
                break;
        }

        this.sortChanged.emit( this.config );
    }
}
