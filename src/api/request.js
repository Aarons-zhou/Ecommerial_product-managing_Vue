import Vue from 'vue'
import axios from 'axios'

export default function request(url, data, method = 'GET') {
    return new Promise(resolve => {
        let result
        if (method === 'GET') {
            result = axios.get(url, {
                params: data,
                headers: { 'Content-Type': 'application/json' }
            })
        } else if (method === 'POST') {
            result = axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        else if (method === 'PUT') {
            result = axios.put(url, data, {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        else if (method === 'DELECT') {
            result = axios.delete(url, {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        result.then(response => {
            resolve(response.data)
        }).catch(err => {
            Vue.prototype.$message.error('网络出错，请稍后再试~')
        })
    })
}