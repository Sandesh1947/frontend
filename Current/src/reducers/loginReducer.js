export default function LoginStateReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_COMPLETED':
            return {AUTH_TOKEN:action.payload}
        case 'LOGOUT': return { }
        default: return state;
    }
}