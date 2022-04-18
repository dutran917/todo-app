const userReducer = (state = {},action) =>{
    switch (action.type) {
        case 'LOGIN':{
            const {id,username} = action.payload
            const user = {
                id,
                username
            }
            return {
                ...state,
                ...user
            }
        }        
        case 'LOGOUT':{
            return {}
        }
        default:{
            return state
        }
    }
}  
export default userReducer