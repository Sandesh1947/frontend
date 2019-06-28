export default function UserPublicationReducer(state = {publications:[],loading:false,noMoreData:false}, action) {
    switch (action.type) {
        case 'FETCHED_USER_PUBLICATIONS':
            return {publications:state.publications.concat(action.payload.data),loading:false,noMoreData:false}
        case 'FETCHING_USER_PUBLICATIONS':
                return {publications:state.publications,loading:true,noMoreData:false}
        case 'NO_MORE_USER_PUBLICATIONS':
                return {publications:state.publications,loading:false,noMoreData:true}
        default: return state;
    }
}