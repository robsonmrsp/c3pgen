import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '@/config/api';

const token = Cookies.get('token');

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};


export const get = (url, parameters = {}, pub = false) => {
  console.log('Calling axios.get with ', url, parameters);
  return axios.get(Config.api.baseURL + url, { ...parameters }, pub ? config : null);
};

export const post = (url, object = {}, pub = false) => {
  console.log('Calling axios.post with ', url);
  return axios.post(Config.api.baseURL + url, { ...object }, config);
};


export const remove = (url, object = {}) => {
  console.log('Calling axios.delete with ', url);
  return axios.delete(Config.api.baseURL + url, { ...object }, pub ? config : null);
};

export const getPage = (parameters) => {
  return axios.get(BASE_URL + this.url, { auth: this.createAuth(), params: { ...parameters } });
}

export const save = (url, pojo = {}) => {
  return axios.post(Config.api.baseURL + url, { ...pojo }, config);
}

export const update = (url, pojo = {}) => {
  return axios.put(Config.api.baseURL + url, { ...pojo }, config);
}

