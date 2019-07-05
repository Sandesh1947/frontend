import React from 'react';
import ProfileView from './ProfileView';
import './profile.scss';
import { connect } from 'react-redux';
import { getUserInfo, getUserPublications, getUserFollowers, getPartners } from '../../actions/userInfoActions';

class ProfileContainer extends React.Component {
  state = {
    lastScrollPos: 0,
    page: 1,
  }

  componentDidMount() {
    if (!this.props.userInfo.user) {
      this.props.getUserInfo();
    }
    if (this.props.userPublications.publications.length === 0) {
      this.props.getUserPublications();
    }
    if (this.props.userFollowers.followers.length === 0) {
      this.props.getUserFollowers();
    }
    if (this.props.userPartners.partners.length === 0) {
      this.props.getPartners();
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  loadMoreData = () => {
    if (this.props.userPublications.noMoreData || this.props.userPublications.loading) {
      return;
    }
    this.props.getUserPublications({ page: this.state.page + 1 });
    this.setState({ page: this.state.page + 1 });
  }

  trackScrolling = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const { userPublications } = this.props;

    if ((!userPublications.noMoreData || !userPublications.loading)
      && this.state.lastScrollPos < scrolled && Math.ceil(scrolled) >= scrollable - 100) {
      this.loadMoreData();
    }

    this.setState({ lastScrollPos: scrolled });
  }

  render() {
    const { userPartners, userPublications, userFollowers, userInfo } = this.props;
    return (
      <ProfileView
        userPartners={userPartners.partners}
        loading={userPublications.loading}
        userFollowers={userFollowers.followers}
        userPublications={userPublications.publications}
        userInfo={userInfo} />
    );
  }
}

const mapStateToProps = state => ({
  userPartners: state.userPartners,
  userInfo: state.userInfo,
  userPublications: state.userPublications,
  userFollowers: state.userFollowers,
});

export default connect(
  mapStateToProps,
  { getUserInfo, getUserPublications, getUserFollowers, getPartners }
)(ProfileContainer); 