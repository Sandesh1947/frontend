import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import { getUserPublications, clearUserPublication } from '../../actions/userPublicationAction';
import { logout } from '../../actions/accountAction';

class HeaderContainer extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <Header
        user={userInfo.user}
        onSubmitPublication={this.onSubmitPublication}
        logout={this.props.logout}
        getUserPublications={this.props.getUserPublications}
        clearUserPublication={this.props.clearUserPublication}
      />
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

const mapDispatchersToProps = {
  logout,
  getUserPublications,
  clearUserPublication,
};

export default connect(mapStateToProps, mapDispatchersToProps)(HeaderContainer);