import API from "../api/axios";

export async function getCampground(campgroundId) {
    return await API.get(`/campgrounds/${campgroundId}`)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.error(err);
        });
}