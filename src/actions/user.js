export const setNewUser = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}