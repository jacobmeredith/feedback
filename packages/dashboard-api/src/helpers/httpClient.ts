
import axios from 'axios';

const httpClient = axios.create({ baseURL: process.env.PLATFORM_API_ENDPOINT, headers: { 'x-api-key': process.env.PLATFORM_API_KEY||"" } });

export {httpClient};
