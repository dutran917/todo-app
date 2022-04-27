

const taskReducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'ADD_NEW_TASK': {
            const tmp = action.payload
            state = tmp
            return {
                ...state,
                type: 'add'
            }
        }
        case 'DELETE_TASK': {
            const tmp = action.payload
            state = tmp
            return {
                ...state,
                type: 'delete'
            }
        }
        case 'UPDATE_TASK': {
            const tmp = action.payload
            state = tmp
            return {
                ...state,
                type: 'update'
            }
        }
        default: {
            return state
        }
    }
}

export default taskReducer