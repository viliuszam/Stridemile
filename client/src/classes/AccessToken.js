const createToken = (token) => {
    localStorage.setItem('accessToken', token)
}

const getToken = () => {
    return localStorage.getItem('accessToken')
}

const removeToken = () => {
    localStorage.removeItem('accessToken')
}

export { createToken, getToken, removeToken };
