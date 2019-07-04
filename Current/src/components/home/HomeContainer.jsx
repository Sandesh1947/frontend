import React from 'react';
import HomeView from './HomeView';
import { connect } from 'react-redux';
import { getUserInfo, getUserPublications, getUserFollowers, publishPost } from '../../actions/userInfoActions';
import Loader from '../Loader/Loader';
import { likePublication, promotePublication } from '../../actions/userPublicationAction';
import Attachment from '../generic/Attachment';

class HomeContainer extends React.Component {
  state = {
    avatar: null,
    publication_text: '',
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
    document.addEventListener('scroll', this.trackScrolling);
  }

  loadMoreData = () => {
    if (this.props.userPublications.noMoreData && this.props.userPublications.loading) {
      return;
    }
    this.props.getUserPublications({ page: this.state.page + 1 });
    this.setState({ page: this.state.page + 1 });
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

  onFileUpload = avatar => {
    this.setState({ avatar });
  }

  removeUpload = () => {
    this.setState({ avatar: null });
  }

  onSubmitPublication = () => {
    if (!this.state.avatar) {
      this.props.publishPost({
        publication_img: '0',
        publication_vid: '0',
        publication_doc: '0',
        publication_text: this.state.publication_text,
      });
      return;
    }
    const formData = new FormData();
    formData.append('post', this.state.avatar);
    formData.append('publication_text', this.state.publication_text);
    formData.append('publication_img', Attachment.isImage(this.state.avatar));
    formData.append('publication_vid', Attachment.isVideo(this.state.avatar));
    formData.append('publication_doc', Attachment.isVideo(this.state.avatar));
    this.props.publishPost(formData);
  }

  onPublicationTextChange = e => {
    this.setState({ publication_text: e.target.value });
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
              userPublications={userPublications.publications}
              userInfo={userInfo}
              avatar={this.state.avatar}
              onFileUpload={this.onFileUpload}
              onRemoveUpload={this.removeUpload}
              submitPublication={this.onSubmitPublication}
              promotePublication={this.props.promotePublication}
              likePublication={this.props.likePublication}
              onPublicationTextChange={this.onPublicationTextChange}
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
  getUserFollowers,
  publishPost,
  likePublication,
  promotePublication,
};

export default connect(mapStateToProps, mapDispatchersToProps)(HomeContainer);