import axios from "axios";

const apiUrl = 'http://localhost:8080';

export class baseService {
    put = (id, model) => {
        return axios({
            url: `${apiUrl}/${id}`,
            method: 'PUT',
            data: model
        })
    };
    post = (url, model) => {
        return axios({
            url: `${apiUrl}/${url}`,
            method: 'POST',
            data: model
        })
    };
    get = (url) => {
        return axios({
            url: `${apiUrl}/${url}`,
            method: 'GET',
        })
    };
    delete = (id) => {
        return axios({
            url: `${apiUrl}/${id}`,
            method: 'DELETE',
        })
    };
}


