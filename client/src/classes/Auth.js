import { createToken, getToken, removeToken } from "./AccessToken"
import { setUser, removeUser } from "./User"
import axios from "axios"

const fetchUserData = async (accessToken) => {
    return axios.get(`http://localhost:3333/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(({ data }) => {
          return data
        })
}

const isLoggedIn = () => {
    if(getToken()) return true
    return false
}

const login = async (accessToken) => {
    const userData = await fetchUserData(accessToken)
    setUser(userData)
    createToken(accessToken)
    return true;
}

const logout = () => {
    removeToken()
    removeUser()
}


export { isLoggedIn, login, logout };