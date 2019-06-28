export default function UserPartnersReducer(state = {partners:[]}, action) {
    switch (action.type) {
        case 'FETCHED_USER_PARTNERS':
            return {partners:action.payload.data}
        default: return state;
    }
}