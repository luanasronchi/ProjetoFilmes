import axios from "axios";

// URL Base: https://api.themoviedb.org/3/

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
});

export default api;
