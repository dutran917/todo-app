const initialState = localStorage.getItem('token') ? true : false
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state = action.payload
            return state
        }
        case 'LOGOUT': {
            state = action.payload
            return state
        }
        default: {
            return state
        }
    }
}