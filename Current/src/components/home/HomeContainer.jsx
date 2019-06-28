import React from 'react'
import HomeView from './HomeView'
import {connect} from 'react-redux'
import {getUserInfo,getUserPublications,getUserFollowers,publishPost} from '../../actions/userInfoActions'
class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          avatar: null,
          publication_text: '',
          publication_img: '0',
          publication_vid: '0',
          lastScrollPos: 0,
          page:1
        }
    
        this.loadMoreData = this.loadMoreData.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.handlePublicatioText = this.handlePublicatioText.bind(this)
      }
    
      componentDidMount() {
        if(!this.props.userInfo.user) {
          this.props.dispatch(getUserInfo())
        }
        if(this.props.userPublications.publications.length ===0) {
          this.props.dispatch(getUserPublications())
        }
        if(this.props.userFollowers.followers.length ===0 ) {
          this.props.dispatch(getUserFollowers())
        }
        document.addEventListener('scroll', this.trackScrolling);
      }
    
      loadMoreData = () => {
    
        if (this.props.userPublications.noMoreData && this.props.userPublications.loading) {
          return;
        }
        this.props.dispatch(getUserPublications({
          page: this.state.page + 1
        }))
        this.setState({page:this.state.page + 1})
      }
    
      trackScrolling = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
    
        if (!this.props.userPublications.noMoreData && !this.props.userPublications.loading && this.state.lastScrollPos < scrolled && Math.ceil(scrolled) >= scrollable - 100) {
          this.loadMoreData();
        }
    
        this.setState({ lastScrollPos: scrolled });
      }
    
      onFileUpload = (e) => {
        if (!e.target.files.length) {
          return;
        }
    
        const file = Array.from(e.target.files)[0];
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          this.setState({ avatar: file, publication_img: '1', publication_vid: '0' });
        } else if (file.type === 'video/mp4') {
          this.setState({ avatar: file, publication_img: '0', publication_vid: '1' });
        } else {
          this.setState({ avatar: null, publication_img: '0', publication_vid: '0' });
        }
      }
    
      onSubmit = () => {
        
        if(!this.state.avatar) {
          this.props.dispatch(publishPost({
            publication_img: this.state.publication_img,
            publication_vid: this.state.publication_vid,
            publication_text: this.state.publication_text
          }))
          return
        }
        const formData = new FormData();
        formData.append('post', this.state.avatar);
        formData.append('publication_text', this.state.publication_text);
        formData.append('publication_img', this.state.publication_img);
        formData.append('publication_vid', this.state.publication_vid);
        this.props.dispatch(publishPost(formData))
      }
    
      handlePublicatioText(e) {
        this.setState({ publication_text: e.target.value })
      }
    
    render() {
        return(
          <React.Fragment>
            {this.props.userInfo.user?<HomeView onFileUpload={this.onFileUpload} loading={this.props.userPublications.loading} userFollowers={this.props.userFollowers.followers} userPublications={this.props.userPublications.publications} userInfo={this.props.userInfo} submit={this.onSubmit} handlePublicatioText={this.handlePublicatioText} stateFields={this.state} />:''}
          </React.Fragment>
        )
    }
}
export default connect(state =>({userInfo:state.userInfo,userPublications:state.userPublications,userFollowers:state.userFollowers})) (HomeContainer)