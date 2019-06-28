export default function UserPublicationReducer(state = {}, action) {
    switch (action.type) {
        case 'FETCHED_USER_PUBLICATIONS':
            return {publications:action.payload.data}
        default: return state;
    }
}