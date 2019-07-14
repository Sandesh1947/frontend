import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Header from './Header';
// import { getUserPublications, clearUserPublication } from '../../actions/userPublicationAction';
import { logout } from '../../actions/accountAction';

class HeaderContainer extends Component {
  // componentDidMount() {
  //   It is better to get user publications at home container and profile container as likes and promotes are done and we need to keep track of it as pages are navigated
  //   this.props.getUserPublications();
  // }

  onSubmitSearchKeyword = (keyword) => {
    if (keyword) {
      let query = { 'search': keyword };
      this.props.history.push({
        pathname: '/searchresults/',
        search: queryString.stringify(Object.assign({}, query)),
      });
    }
  }

  redirectToSearchPage = keyword => {
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
        redirectPage={this.redirectToSearchPage}
      />
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

const mapDispatchersToProps = {
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchersToProps)(HeaderContainer));
