import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Attachment from '../generic/Attachment';
import { publishPost ,getUserPublications,clearUserPublication} from '../../actions/userInfoActions';
import { logout } from '../../actions/accountAction';
class HeaderContainer extends Component {
  onSubmitPublication = ({ text, attachment, publicationType, visibility }) => {
    const post = new FormData();
    post.append('publication_text', text);
    post.append('publication_type', publicationType);
    post.append('visibility', visibility);
    if (attachment) {
      post.append('post', attachment);
      post.append('publication_img', Attachment.isImage(attachment) ? '1' : '0');
      post.append('publication_video', Attachment.isVideo(attachment) ? '1' : '0');
    }
    this.props.publishPost(post);
  }

  render() {
    return (
      <Header
        user={this.props.userInfo.user}
        onSubmitPublication={this.onSubmitPublication}
        logout={this.props.logout}
        getUserPublications={this.props.getUserPublications}
        clearUserPublication={this.props.clearUserPublication}
      />
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps, { publishPost, logout,getUserPublications ,clearUserPublication})(HeaderContainer);