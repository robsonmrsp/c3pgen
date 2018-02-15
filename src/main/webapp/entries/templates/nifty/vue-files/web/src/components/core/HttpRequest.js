import axios from 'axios';

const BASE_URL = 'http://localhost:8180/netflics'

export default class HttpRequest {
    constructor(url) {
        if (!url) {
            throw new Error('Deve ser definida uma url para o serviço!');
        }
        this.url = url;
    }

    createAuthHeaders() {
        let headers = {}
        headers['Authorization'] = 'Basic ' + btoa('jsetup:123456');
        headers['Content-Type'] = 'application/json';
        return headers;
    }

    getById(id, successCallback, errorCalback) {
        axios.get(BASE_URL + this.url + "/" + id, { headers: this.createAuthHeaders() })
            .then(response => {
                if (successCallback) {
                    successCallback(response.data);
                }
            }).catch(function (error) {
                if (errorCalback) {
                    errorCalback(error);
                }
            });
    }

    getPage(datatablePageConfig, successCallback, errorCalback) {
        let jsonParans = {}
        let params = {}

        Object.assign(jsonParans, datatablePageConfig, datatablePageConfig.filterParameters);

        delete jsonParans.items;
        delete jsonParans.filterParameters;

        for (let key in jsonParans) {
            params[key] = jsonParans[key];
        }
        datatablePageConfig.loading = true;

        axios.get(BASE_URL + this.url, { headers: this.createAuthHeaders(), params: params })
            .then(response => {
                datatablePageConfig.loading = false;
                datatablePageConfig.update(response.data);
                if (successCallback) {
                    successCallback(response.data);
                }
            }).catch(function (error) {
                datatablePageConfig.loading = false;
                console.log(error);
                if (errorCalback) {
                    errorCalback(error);
                }
            });
    }

    // TODO melhorar esse código
    save(object, successCallback, errorCalback) {
        let id = object.id
        if (id) {
            axios.put(BASE_URL + this.url + "/" + id, object, { headers: this.createAuthHeaders() })
                .then(response => {
                    if (successCallback) {
                        successCallback(response.data);
                    }
                }).catch(function (error) {
                    if (errorCalback) {
                        errorCalback(error);
                    }
                });
        } else {
            axios.post(BASE_URL + this.url, object, { headers: this.createAuthHeaders() })
                .then(response => {
                    if (successCallback) {
                        successCallback(response.data);
                    }
                }).catch(function (error) {
                    if (errorCalback) {
                        errorCalback(error);
                    }
                });
        }
    }

    delete() {

    }
}
