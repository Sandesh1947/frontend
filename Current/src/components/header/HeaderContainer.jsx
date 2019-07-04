import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Attachment from '../generic/Attachment';
import { publishPost } from '../../actions/userInfoActions';
import { logout } from '../../actions/accountAction';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
class HeaderContainer extends Component {
  onSubmitPublication = ({ text, pieceFile, pieceType, attachment }) => {
    const post = new FormData();
    post.append('publication_text', text);
    if (attachment) {
      post.append('post', attachment);
      post.append('publication_img', Attachment.isImage(attachment) ? '1' : '0');
      post.append('publication_vide', Attachment.isVideo(attachment) ? '1' : '0');
    }
    if (pieceFile) {
      post.append('piece', pieceFile);
      post.append('pieceType', pieceType);
      post.append('piece_img', Attachment.isImage(pieceFile) ? '1' : '0');
      post.append('piece_vid', Attachment.isVideo(pieceFile) ? '1' : '0');
    }
    this.props.publishPost(post);
  }
  onSubmitSearchKeyword = (keyword) => {
    let query = {'search':keyword}
    this.props.history.push({
      pathname: '/searchresults/',
      search: queryString.stringify(Object.assign({},query))
    });
  }
  redirectToSearchPage() {
    if (this.props.location.pathname !== '/searchresults/')
      this.props.history.push({
        pathname: '/searchresults/',
      });
  }
  render() {
    return (
      <Header
        user={this.props.userInfo.user}
        onSubmitPublication={this.onSubmitPublication}
        logout={this.props.logout}
        onSubmitSearchKeyword={this.onSubmitSearchKeyword}
        redirectPage={this.redirectToSearchPage.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default withRouter(connect(mapStateToProps, { publishPost, logout })(HeaderContainer));