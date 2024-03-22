import { createToken, getToken, removeToken } from "./AccessToken"
import { setUser, removeUser, getUser } from "./User"
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
    if(getToken() && Object.keys(getUser()).length !== 0) return true
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