export const login = (isLogin: boolean) => {
    return {
        type: 'LOGIN',
        payload: isLogin
    }
}
export const logout = (isLogin: boolean) => {
    return {
        type: 'LOGOUT',
        payload: isLogin
    }
}