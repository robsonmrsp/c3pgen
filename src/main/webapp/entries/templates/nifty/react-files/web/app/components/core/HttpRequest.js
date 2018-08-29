import axios from 'axios';

const BASE_URL = 'http://localhost:8082/locadora-react'

export default class HttpRequest {
    constructor(url) {
        if (!url) {
            throw new Error('Deve ser definida uma url para o serviço!');
        }
        this.url = url;
    }

    createAuthHeaders = () => {
        const headers = {}
        headers['Authorization'] = 'Basic ' + btoa('jsetup:123456');
        headers['Content-Type'] = 'application/json';
        return headers;
    }

    getById = (id, successCallback, errorCalback) => {
        axios.get(BASE_URL + this.url + "/" + id, { headers: this.createAuthHeaders() })
            .then((response) => {
                if (successCallback) {
                    successCallback(response.data);
                }
            }).catch((error) => {
                if (errorCalback) {
                    errorCalback(error);
                }
            });
    }

    getPage = (datatablePageConfig, successCallback, errorCalback) => {
        const jsonParans = {}

        Object.assign(jsonParans, datatablePageConfig, datatablePageConfig.filterParameters);

        delete jsonParans.items;
        delete jsonParans.filterParameters;
        delete jsonParans.update;
        delete jsonParans.totalRecords;
        delete jsonParans.loading;

        datatablePageConfig.loading = true;

        // TODO Fazer esse get page devolver um datapageconfig 
        axios.get(BASE_URL + this.url, { headers: this.createAuthHeaders(), params: jsonParans })
            .then((response) => {
                datatablePageConfig.loading = false;
                datatablePageConfig.items = response.data.items;

                if (successCallback) {
                    successCallback(response.data);
                }
            }).catch((error) => {
                datatablePageConfig.loading = false;
                console.log(error);
                if (errorCalback) {
                    errorCalback(error);
                }
            });
    }

    getAll = (successCallback, errorCalback) => {
        axios.get(BASE_URL + this.url + "/all", { headers: this.createAuthHeaders() })
            .then((response) => {
                if (successCallback) {
                    console.log("request result: ", response.data);
                    successCallback(response.data);
                }
            }).catch((error) => {
                if (errorCalback) {
                    errorCalback(error);
                }
            });
    }
    // TODO melhorar esse código
    save = (object, successCallback, errorCalback) => {
        const id = object.id
        if (id) {
            axios.put(BASE_URL + this.url + "/" + id, object, { headers: this.createAuthHeaders() })
                .then((response) => {
                    if (successCallback) {
                        successCallback(response.data);
                    }
                }).catch((error) => {
                    if (errorCalback) {
                        errorCalback(error);
                    }
                });
        } else {
            axios.post(BASE_URL + this.url, object, { headers: this.createAuthHeaders() })
                .then((response) => {
                    if (successCallback) {
                        successCallback(response.data);
                    }
                }).catch((error) => {
                    if (errorCalback) {
                        errorCalback(error);
                    }
                });
        }
    }

    delete = () => {

    }
}
