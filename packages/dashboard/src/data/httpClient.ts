import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_DASHBOARD_API,
  headers: { 
    'x-api-key': process.env.REACT_APP_DASHBOARD_API_KEY||""
  }
});

export {httpClient};
