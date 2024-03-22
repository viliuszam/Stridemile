const setUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
}

const getUser = () => {
    if(!localStorage.getItem('user')) return {}
    return JSON.parse(localStorage.getItem('user'))
}

const removeUser = () => {
    localStorage.removeItem('user')
}

export { setUser, getUser, removeUser };