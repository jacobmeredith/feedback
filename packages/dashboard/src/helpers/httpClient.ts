import axios from 'axios';

const httpClient = axios.create({ baseURL: process.env.REACT_APP_DASHBOARD_API });

export {httpClient};
