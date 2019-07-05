import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Header from './Header';
import { getUserPublications, clearUserPublication } from '../../actions/userPublicationAction';
import { logout } from '../../actions/accountAction';

class HeaderContainer extends Component {
  onSubmitSearchKeyword = (keyword) => {
    if (keyword) {
      let query = { 'search': keyword };
      this.props.history.push({
        pathname: '/searchresults/',
        search: queryString.stringify(Object.assign({}, query)),
      });
    }
  }
  redirectToSearchPage(keyword) {
    if (this.props.location.pathname !== '/searchresults/' && keyword !== '') {
      this.props.history.push({
        pathname: '/searchresults/',
      });
    }
  }

  render() {
    const { userInfo } = this.props;
    return (
      <Header
        user={userInfo.user}
        onSubmitPublication={this.onSubmitPublication}
        logout={this.props.logout}
        onSubmitSearchKeyword={this.onSubmitSearchKeyword}
        redirectPage={this.redirectToSearchPage.bind(this)}
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

export default withRouter(connect(mapStateToProps, mapDispatchersToProps)(HeaderContainer));
