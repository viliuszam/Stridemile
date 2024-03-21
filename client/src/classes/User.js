const setUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const removeUser = () => {
    localStorage.removeItem('user')
}

export { setUser, getUser, removeUser };