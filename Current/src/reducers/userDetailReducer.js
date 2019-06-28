export default function UserDetailReducer(state = {}, action) {
    switch (action.type) {
        case 'FETCHED_USER_INFO':
            return {user:action.payload.data}
        default: return state;
    }
}