//@ts-nocheck
import axios from 'axios';

const url = 'http://localhost:3030/api/linear';

export const getDatal = async () => await axios.get(url);

export const createData = async (data) => await axios.post(url, data);
