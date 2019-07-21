import React from 'react'
import EditProfleView from './EditProfileView'
import { getUserInfo,editUserProfile } from '../../actions/userInfoActions';
import { connect } from 'react-redux'
class EditProfileContainer extends React.Component {
    constructor() {
        super()
        this.editProfile = this.editProfile.bind(this)
    }
    componentDidMount() {
        if (!this.props.userInfo.user) {
            this.props.getUserInfo();
        }
    }
    editProfile(data) {
        editUserProfile(data).then(
            (res) =>{
                this.props.getUserInfo();
            }
        )

    }
    render() {
        return (
            <React.Fragment>
                {this.props.userInfo.user && <EditProfleView editProfile={this.editProfile} userInfo={this.props.userInfo.user[0]} />}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps,{getUserInfo})(EditProfileContainer)