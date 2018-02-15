/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormFilmeComponent } from './form-filme.component';

describe( 'FormFilmeComponent', () => {
    let component: FormFilmeComponent;
    let fixture: ComponentFixture<FormFilmeComponent>;

    beforeEach( async(() => {
        TestBed.configureTestingModule( {
            declarations: [FormFilmeComponent]
        } )
            .compileComponents();
    } ) );

    beforeEach(() => {
        fixture = TestBed.createComponent( FormFilmeComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
