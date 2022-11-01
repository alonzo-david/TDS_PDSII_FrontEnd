import axios from "axios";
import * as env from "../config/environment/environment";
const { API_URL, API_PREGUNTA } = env.production; //env.test //env[process.env.NODE_ENV]; //env.development;

const URL_API = `${API_URL}`;
const URL_API_PREGUNTA = `${API_PREGUNTA}`;

const Api = {
  Get: async (endpoint, token) => {
    const response = await axios.get(URL_API + endpoint, {
      headers: {
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // "Access-Token": "Bearer " + token,
      },
    });
    return response;
  },
  Post: async (endpoint, payload, token) => {
    const response = await axios.post(URL_API + endpoint, payload, {
      headers: {
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // "Access-Token": "Bearer " + token,
      },
    });
    return response;
  },
  Put: async (endpoint, payload, token) => {
    const response = await axios.put(
      URL_API + endpoint,
      JSON.stringify(payload),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          // "Access-Token": "Bearer " + token,
        },
      }
    );
    return response;
  },
  Delete: async (endpoint, payload, token) => {
    const response = await axios.delete(URL_API + endpoint, {
      data: { payload },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // "Access-Token": "Bearer " + token,
      },
    });
    return response;
  },
};

const ApiPregunta = {
  Get: async (endpoint) => {
    const response = await axios.get(endpoint, {
      
    });
    return response;
  },
};

export { Api, ApiPregunta };
