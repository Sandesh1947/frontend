import React from 'react';
import HomeView from './HomeView';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { getUserInfo, getUserFollowers } from '../../actions/userInfoActions';
import { getUserPublications } from '../../actions/userPublicationAction';

class HomeContainer extends React.Component {
  state = {
    lastScrollPos: 0,
  }

  componentDidMount() {
    this.props.getUserPublications();
    // TODO: move this to header??
    // Header is always mounted, while HomeContainer is mounted on the /home page only
    if (!this.props.userInfo.user) {
      this.props.getUserInfo();
    }
    if (this.props.userFollowers.followers.length === 0) {
      this.props.getUserFollowers();
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  loadMoreData = () => {
    if (this.props.userPublications.noMoreData || this.props.userPublications.loading) {
      return;
    }
    this.props.getUserPublications({ page: this.props.userPublications.page + 1 });
    this.props.userPublications.page = this.props.userPublications.page + 1  
  }

  trackScrolling = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (!this.props.userPublications.noMoreData && !this.props.userPublications.loading
      && this.state.lastScrollPos < scrolled && Math.ceil(scrolled) >= scrollable - 100) {
      this.loadMoreData();
    }

    this.setState({ lastScrollPos: scrolled });
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  render() {
    const { userPublications, userInfo, userFollowers } = this.props;
    return (
      <React.Fragment>
        {
          userInfo.user
            ? <HomeView
              loading={userPublications.loading}
              userFollowers={userFollowers.followers}
              userPublications={userPublications.publications || []}
              userInfo={userInfo}
              // TODO: `stateFields` doesn't like good
              // maybe keep state inside HomeView and only pass down acitons
              // instead of tracking underlying component state here???
              stateFields={this.state}
            />
            : this.props.userPublications.loading && <Loader />
        }
      </React.Fragment >
    );
  }
}

const mapStateToProps = ({ userInfo, userPublications, userFollowers }) => ({
  userInfo,
  userPublications,
  userFollowers,
});

const mapDispatchersToProps = {
  getUserInfo,
  getUserPublications,
  getUserFollowers
};

export default connect(mapStateToProps, mapDispatchersToProps)(HomeContainer);
