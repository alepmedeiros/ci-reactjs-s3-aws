import axios from 'axios';
//const api = axios.create({ baseURL : 'http://54.221.5.196:9000' });
const apiAuth = axios.create({ baseURL : 'http://localhost:9001' });
export default apiAuth;