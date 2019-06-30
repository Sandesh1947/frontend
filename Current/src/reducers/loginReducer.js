export default function LoginStateReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_COMPLETED':
            return { AUTH_TOKEN: action.payload }
        case 'LOGIN_FAILED':
            return { login_failed: true }
        case 'LOGOUT': return { }
        default: return state;
    }
}