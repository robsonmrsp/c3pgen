import axios from "axios";
import Cookies from "js-cookie";
import Config from "@/config/api";

const token = Cookies.get("token");

export default class HttpRequest {
  constructor(url) {
    if (!url) {
      throw new Error("Deve ser definida uma url para o serviço!");
    }
    this.url = url;
    // this.config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //     }
    // }

    this.config = {
      headers: { Authorization: "Basic anNldHVwOjEyMzQ1Ng==" },
    };
  }

  getPage = (parameters) => {
    console.log("Chamando getPage com os parametros: ", parameters);
    console.log("config: ", this.config);
    return axios.get(Config.api.baseURL + this.url, {
      params: parameters,
      ...this.config,
    });
  };

  getById = (id) => {
    console.log("Chamando getById com o parametro: ", id);
    return axios.get(Config.api.baseURL + this.url + "/" + id, {
      ...this.config,
    });
  };

  save = (pojo) => {
    if (pojo.id)
      return axios.put(
        Config.api.baseURL + this.url + "/" + pojo.id,
        { ...pojo },
        this.config
      );
    return axios.post(Config.api.baseURL + this.url, { ...pojo }, this.config);
  };
}
