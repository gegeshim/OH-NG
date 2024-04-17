import axios from 'axios';

export async function requestApi(method, url, data, headers = {}) {
  const config = {
    method: method,
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Creadentials': true,
      ...headers,
    },
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log('axios error :: ', error);
    throw error;
  }
}
