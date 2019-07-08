import React from 'react'
import PromotedOrLikedUsersView from './PromotedOrLikedUsersView'
import { connect } from 'react-redux'
import { fetchLikedUsers, fetchPromotedUsers, clearLikedUsers, clearPromotedUsers } from '../../actions/userPublicationAction'

class PromotedOrLikedUsersContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { page: 1 };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    if (this.props.type === 'liked' && (!this.props.likedUsers.loading && !this.props.likedUsers.noMoreData)) {
      this.props.fetchLikedUsers(this.props.id, { 'page': this.state.page + 1 });
      this.setState({ 'page': this.state.page + 1 });
    } else if (this.props.type === 'promotes' && (!this.props.promotedUsers.loading && !this.props.promotedUsers.noMoreData)) {
      this.props.fetchPromotedUsers(this.props.id, { 'page': this.state.page + 1 });
      this.setState({ 'page': this.state.page + 1 });
    }
  }

  componentDidMount() {
    if (this.props.type === 'liked') {
      this.props.fetchLikedUsers(this.props.id);
    } else {
      this.props.fetchPromotedUsers(this.props.id);
    }
  }

  componentWillUnmount() {
    this.props.clearLikedUsers()
    this.props.clearPromotedUsers()
  }

  render() {
    return (
      <PromotedOrLikedUsersView loadMore={this.loadMore} {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  likedUsers: state.likedUsers,
  promotedUsers: state.promotedUsers,
});
const mapDispatchersToProps = {
  fetchLikedUsers,
  fetchPromotedUsers,
  clearPromotedUsers,
  clearLikedUsers
};

export default connect(mapStateToProps, mapDispatchersToProps)(PromotedOrLikedUsersContainer);