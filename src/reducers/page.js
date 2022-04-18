export const pageReducer = (state = 1,action) => {
    switch (action.type) {
        case 'SET_PAGE':{
            const tmp = action.payload
            state = tmp
            return state
        }
        default:
            return state
    }
}