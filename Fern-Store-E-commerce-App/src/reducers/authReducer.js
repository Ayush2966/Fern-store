const authReducer = (state, action) => {
    switch(action.type){
        case('login'):
            return {...state, token: action.payload, user: action.user}; 
        default: return state;
    }
}   
export {authReducer};