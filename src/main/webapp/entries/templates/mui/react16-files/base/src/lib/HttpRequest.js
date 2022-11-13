import axios from 'axios';

const BASE_URL = 'http://localhost:8081'

export default class HttpRequest {
    constructor(url) {
        if (!url) {
            throw new Error('Deve ser definida uma url para o serviço!');
        }
        this.url = url;
    }

    createAuth = () => {
        const auth = {
            username: 'jsetup',
            password: '123456',
        };
        return auth;
    }

    /**
     * 
     * @param {*} searchParameters 
     */
    getPage = (parameters) => {
        console.log('Chamando getPage com os parametros: ', parameters);
        return axios.get(BASE_URL + this.url, { auth: this.createAuth(), params: { ...parameters } });
    }

    getById = (id) => {
        console.log('Chamando getById com o parametro: ', id);
        return axios.get(BASE_URL + this.url + "/" + id, { auth: this.createAuth() });
    }

    save = (pojo = {}) => {
        if (pojo.id)
            return axios.put(BASE_URL + this.url + '/' + pojo.id, { ...pojo }, { auth: this.createAuth() });
        return axios.post(BASE_URL + this.url, { ...pojo }, { auth: this.createAuth() });
    }
}
