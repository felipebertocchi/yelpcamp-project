import API from "../api/axios"
import { decodeJWT } from "../utils/decodeJWT";

export const AuthService = {
    handleSignUp: async (userInput) => API.post('register', userInput)
        .then(response => {
            const { token } = response.data
            localStorage.setItem('user', JSON.stringify({ token }));
            const user = decodeJWT(token);
            return { user }
        }),
    handleLogin: async (userInput) => API.post('login', userInput)
        .then(response => {
            const { token } = response.data
            localStorage.setItem('user', JSON.stringify({ token }));
            const user = decodeJWT(token);
            return { user }
        }),
    handleLogout: async () => API.get('logout').then(() => localStorage.removeItem('user')),
}