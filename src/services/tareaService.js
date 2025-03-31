import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const obtenerTareas = () => axios.get(`${API_URL}?_limit=5`);
export const crearTarea = (texto) => axios.post(API_URL, { title: texto, completed: false });
