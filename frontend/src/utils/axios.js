import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://full-stack-task-management-app-py48.onrender.com/api/v1',
});

export default customFetch;
