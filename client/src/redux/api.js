import axios from 'axios';

const API = axios.create({ baseURL: "https://tour-app-q3mb.onrender.com" });

API.interceptors.request.use((config) => {
    if (localStorage.getItem("profile")) {
        config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return config;
});

export const signIn = (formdata) => API.post("/users/signin", formdata);
export const signUp = (formdata) => API.post("/users/signup", formdata);

export const create = (tourdata) => API.post("/tour", tourdata);
export const getTours = (page) => API.get(`/tour?page=${page}`);
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = ({ updatedTourData, id }) => API.patch(`/tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
export const getToursBySearch = (searchQuery) => API.get(`/tour/search?searchQuery=${searchQuery}`);
export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);