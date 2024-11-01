//@ts-nocheck
import axios from 'axios';

const url = 'https://numer-api-sigma.vercel.app/api/linear';

export const getDatal = async () => await axios.get(url);

export const createData = async (data) => await axios.post(url, data);
