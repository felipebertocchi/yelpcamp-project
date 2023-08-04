import axios from "axios";

export async function getCampground(campgroundId) {
    return await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/campgrounds/${campgroundId}`)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.error(err);
        });
}