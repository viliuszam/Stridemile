import { createToken, getToken, removeToken } from "./AccessToken"

const isLoggedIn = () => {
    if(getToken()) return true
    return false
}

const login = (accessToken) => {
    createToken(accessToken)
}

const logout = () => {
    removeToken()
}


export { isLoggedIn, login, logout };