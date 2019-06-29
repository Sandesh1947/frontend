import React from 'react';
import HomeView from './HomeView';
import { connect } from 'react-redux';
import { getUserInfo, getUserPublications, getUserFollowers, publishPost } from '../../actions/userInfoActions';
class HomeContainer extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      avatar: null,
      publication_text: '',
      publication_img: '0',
      publication_vid: '0',
      lastScrollPos: 0,
      page: 1,
    };

    this.loadMoreData = this.loadMoreData.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.handlePublicatioText = this.handlePublicatioText.bind(this);
  }

  componentDidMount() {
    if (!this.props.userInfo.user) {
      this.props.dispatch(getUserInfo());
    }
    if (this.props.userPublications.publications.length === 0) {
      this.props.dispatch(getUserPublications());
    }
    if (this.props.userFollowers.followers.length === 0) {
      this.props.dispatch(getUserFollowers());
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  loadMoreData = () => {

    if (this.props.userPublications.noMoreData && this.props.userPublications.loading) {
      return;
    }
    this.props.dispatch(getUserPublications({
      page: this.state.page + 1,
    }));
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

  onFileUpload = ({ attachment: avatar, attachmentType: avatarType }) => {
    if (!avatar) {
      return;
    }

    if (avatarType === 'image') {
      // TODO: get rid of weird 1/0 flags in state, they are only needed on the server, right?
      this.setState({ avatar, avatarType, publication_img: '1', publication_vid: '0' });
    } else if (avatarType === 'video') {
      this.setState({ avatar, avatarType, publication_img: '0', publication_vid: '1' });
    } else {
      this.removeUpload();
    }
  }

  removeUpload = () => {
    this.setState({ avatar: null, avatarType: null, publication_img: '0', publication_vid: '0' });
  }

  onSubmit = () => {
    if (!this.state.avatar) {
      this.props.dispatch(publishPost({
        publication_img: this.state.publication_img,
        publication_vid: this.state.publication_vid,
        publication_text: this.state.publication_text,
      }));
      return;
    }
    const formData = new FormData();
    formData.append('post', this.state.avatar);
    formData.append('publication_text', this.state.publication_text);
    formData.append('publication_img', this.state.publication_img);
    formData.append('publication_vid', this.state.publication_vid);
    this.props.dispatch(publishPost(formData));
  }

  handlePublicatioText(e) {
    this.setState({ publication_text: e.target.value });
  }

  render() {
    const { userPublications, userInfo, userFollowers } = this.props;
    const { avatar, avatarType } = this.state;
    return (
      <React.Fragment>
        {userInfo.user
          ? <HomeView
            loading={userPublications.loading}
            userFollowers={userFollowers.followers}
            userPublications={userPublications.publications}
            userInfo={userInfo}
            avatar={avatar}
            avatarType={avatarType}
            onFileUpload={this.onFileUpload}
            onRemoveUpload={this.removeUpload}
            submit={this.onSubmit}
            handlePublicatioText={this.handlePublicatioText}
            stateFields={this.state}
          />
          : ''
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ userInfo, userPublications, userFollowers }) => ({
  userInfo,
  userPublications,
  userFollowers,
});
export default connect(mapStateToProps)(HomeContainer);