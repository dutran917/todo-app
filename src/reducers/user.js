const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER': {
            const { id, username } = action.payload
            const user = {
                id,
                username
            }
            return {
                ...state,
                ...user
            }
        }
        default: {
            return state
        }
    }
}
export default userReducer