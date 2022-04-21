export const login = (isLogin) => {
    return {
        type: 'LOGIN',
        payload: isLogin
    }
}
export const logout = (isLogin) => {
    return {
        type: 'LOGOUT',
        payload: isLogin
    }
}