export function decodeJWT(token) {
    return JSON.parse(atob(token.split(".")[1]))
}