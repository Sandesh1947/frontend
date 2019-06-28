export function getUserInfo() {
    return {type:'GET_USER_INFO'}
}
export function getUserPublications() {
    return {type:'GET_USER_PUBLICATIONS'}
}
export function getUserFollowers() {
    return {type:'GET_USER_FOLLOWERS'}
}
export function publishPost(data) {
    return {type:'PUBLISH_POST',data:data}
}