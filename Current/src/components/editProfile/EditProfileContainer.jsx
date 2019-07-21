import React from 'react'
import EditProfleView from './EditProfileView'
import { getUserInfo } from '../../actions/userInfoActions';
import { connect } from 'react-redux'
class EditProfileContainer extends React.Component {
    componentDidMount() {
        if (!this.props.userInfo.user) {
            this.props.getUserInfo();
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.props.userInfo.user && <EditProfleView userInfo={this.props.userInfo.user[0]} />}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps,{getUserInfo})(EditProfileContainer)