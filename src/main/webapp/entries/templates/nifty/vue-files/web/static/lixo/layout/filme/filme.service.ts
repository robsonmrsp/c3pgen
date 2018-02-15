import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DatatablePageConfig } from '../components/core/models/datatable-page-config';
import { RequestUtils } from '../components/core/models//request-utils';

@Injectable()
export class FilmeService {

    constructor( private http: Http ) { }

    getOne( id ): Observable<any> {
        let headers = RequestUtils.createAuthHeaders();

        return this.http.get( RequestUtils.getBaseUrl() + '/rs/crud/filmes/' + id, {
            headers: headers,
        } )
            .map(( response: Response ) => {
                return <any>response.json();
            } ).catch( this.handleError );
    }

    getPage( datatablePageConfig: DatatablePageConfig ): Observable<any> {
        let headers = RequestUtils.createAuthHeaders();

        datatablePageConfig.loading = true;

        let parans = RequestUtils.createParans( datatablePageConfig );

        return this.http.get( RequestUtils.getBaseUrl() + '/rs/crud/filmes', {
            headers: headers,
            search: parans
        } )
            .map(( response: Response ) => {
                datatablePageConfig.loading = false;
                return <any>response.json();
            } ).catch( this.handleError );

    }

    save( filme: any ): Observable<any> {
        let headers = RequestUtils.createAuthHeaders();
        let body = JSON.stringify( filme );
        if ( filme.id ) {
            return this.http.put( RequestUtils.getBaseUrl() + '/rs/crud/filmes/' + filme.id, body, {
                headers: headers,
            } ).map(( response: Response ) => <any>response.json() )
                .catch( this.handleError );
        } else {
            return this.http.post( RequestUtils.getBaseUrl() + '/rs/crud/filmes', body, {
                headers: headers,
            } ).map(( response: Response ) => <any>response.json() )
                .catch( this.handleError );
        }
    }

    remove( id ): Observable<any> {
        let headers = RequestUtils.createAuthHeaders();

        return this.http.delete( RequestUtils.getBaseUrl() + '/rs/crud/filmes/' + id, {
            headers: headers,
        } )
            .map(( response: Response ) => {
                return response;
            } ).catch( this.handleError );
    }

    private handleError( error: Response ) {
        console.error( error );
        return Observable.throw( error.json().error || 'Server error' );
    }

}
