export default function UserFollowersReducer(state = {}, action) {
    switch (action.type) {
        case 'FETCHED_USER_FOLLOWERS':
            return {followers:action.payload.data}
        default: return state;
    }
}