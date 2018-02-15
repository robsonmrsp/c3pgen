import {Injectable} from '@angular/core';

import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {DatatablePageConfig} from './datatable-page-config';

/**
 *      
 */
export class RequestUtils {
  public static createParans(datatablePageConfig: DatatablePageConfig): URLSearchParams {
    let jsonParans = {}
    let params: URLSearchParams = new URLSearchParams();

    Object.assign(jsonParans, datatablePageConfig.config, datatablePageConfig.filterParameters);

    for (let key in jsonParans) {
      params.set(key, jsonParans[key]);
    }

    return params;
  }

  public static getBaseUrl(): String {
    return 'http://localhost:8980/netflics'
  }

  public static createAuthHeaders(): Headers {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('jsetup:123456'));
    headers.append('Content-Type', 'application/json');
    return headers;
  }

}

