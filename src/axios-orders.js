import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-beadb.firebaseio.com/'
});


export default instance;