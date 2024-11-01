//@ts-nocheck
import axios from 'axios';

const url = 'https://numer-api-sigma.vercel.app/api/root';

export const getData = async () => await axios.get(url);

export const createData = async (data) => await axios.post(url, data);

export const readsol = async (id) => await axios.get(`${url}/${id}`);
