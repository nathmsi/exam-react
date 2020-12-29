import axios from 'axios'



const instance = axios.create({
    baseURL: 'http://localhost:8080/api', //process.env.REACT_APP_API
    responseType: "json"
})



export default instance;