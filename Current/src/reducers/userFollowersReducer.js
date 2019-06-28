export default function UserFollowersReducer(state = {followers:[]}, action) {
    switch (action.type) {
        case 'FETCHED_USER_FOLLOWERS':
            return {followers:action.payload.data}
        default: return state;
    }
}