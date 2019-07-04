import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Attachment from '../generic/Attachment';
import { publishPost, getUserPublications, clearUserPublication } from '../../actions/userInfoActions';
import { logout } from '../../actions/accountAction';
import { getWorkTypes } from '../../actions/workTypeAction';
import { getAccessTypes } from '../../actions/accessTypeAction';

class HeaderContainer extends Component {
  componentDidMount() {
    if (this.props.workTypes.length === 0) {
      this.props.getWorkTypes();
    }
    if (this.props.accessTypes.length === 0) {
      this.props.getAccessTypes();
    }
  }

  onSubmitPublication = ({ text, attachment, workType, accessType }) => {
    const isImage = attachment && Attachment.isImage(attachment);
    const isVideo = attachment && !isImage && Attachment.isVideo(attachment);
    const isDocument = attachment && !isImage && !isVideo;

    const params = {
      posts: attachment,
      'publication_img': isImage ? '1' : '0',
      'publication_vid': isVideo ? '1' : '0',
      'publication_doc': isDocument ? '1' : '0',
      'publication_txt': text,
      'work_type': workType ? workType.id : null,
      'access': accessType ? accessType.id : null,
      'publication_type': 2, // Work
    };

    if (params.posts) {
      // if there's an attachment - send form-data request
      const post = new FormData();
      Object.keys(params).forEach(param => post.append(param, params[param]));
      this.props.publishPost(post);
    } else {
      // o/w send application/json request
      this.props.publishPost(params);
    }
  }

  render() {
    const { userInfo, workTypes, accessTypes } = this.props;
    return (
      <Header
        user={userInfo.user}
        workTypes={workTypes}
        accessTypes={accessTypes}
        onSubmitPublication={this.onSubmitPublication}
        logout={this.props.logout}
        getUserPublications={this.props.getUserPublications}
        clearUserPublication={this.props.clearUserPublication}
      />
    );
  }
}

const mapStateToProps = ({ userInfo, workTypes, accessTypes }) => ({
  userInfo,
  workTypes: workTypes.workTypes,
  accessTypes: accessTypes.accessTypes,
});

const mapDispatchersToProps = {
  publishPost,
  logout,
  getUserPublications,
  clearUserPublication,
  getWorkTypes,
  getAccessTypes,
};

export default connect(mapStateToProps, mapDispatchersToProps)(HeaderContainer);