import React from 'react'
import ProfileView from './ProfileView'
import './profile.scss';
import {connect} from 'react-redux'
import {getUserInfo,getUserPublications,getUserFollowers,getPartners} from '../../actions/userInfoActions'
class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastScrollPos: 0,
            page: 1,
        }
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

    render() {
        return(
            <ProfileView userPartners={this.props.userPartners.partners}loading={this.props.userPublications.loading} userFollowers={this.props.userFollowers.followers} userPublications={this.props.userPublications.publications} userInfo={this.props.userInfo}/>
        )
    }
}
export default  connect(state =>({userPartners:state.userPartners,userInfo:state.userInfo,userPublications:state.userPublications,userFollowers:state.userFollowers})) (ProfileContainer) 