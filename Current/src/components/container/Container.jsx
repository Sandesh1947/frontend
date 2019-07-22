import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderContainer from '../header/HeaderContainer';
import HomeContainer from '../home/HomeContainer';
import ProfileContainer from '../profile/ProfileContainer';
import SearchResultsContainer from '../searchresults/searchResultsContainer'
import SettingsContainer from '../settings/SettingsContainer'
import { getUserInfo } from '../../actions/userInfoActions';
class Container extends React.Component {
  state = {
    isLoggedIn: false,
    isLoadingLocalStorage: true,
  };

  componentDidMount() {
    if (localStorage.getItem('AUTH_TOKEN')) {
      this.setState({ isLoggedIn: true, isLoadingLocalStorage: false });
      this.props.getUserInfo();
      if (this.props.location.pathname === '/') {
        this.props.history.push({
          pathname: '/home',
        });
      }
    } else {
      this.setState({ isLoadingLocalStorage: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoggedIn ?
          <section>
            <HeaderContainer />
            <Switch>
              <Route path="/profile" component={ProfileContainer} />
              <Route path="/home" component={HomeContainer} />
              <Route path='/searchresults' component={SearchResultsContainer}/>
              <Route path='/settings' component={SettingsContainer}/>
            </Switch>
          </section> : !this.state.isLoadingLocalStorage ? <Redirect to="/login" /> : ''}
      </React.Fragment>
    );
  }
}

export default connect(() => ({}), { getUserInfo })(Container);