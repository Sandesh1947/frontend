import React from 'react'
import HomeView from './HomeView'
import { BASE_URL } from '../../app.constants';
import Axios from 'axios';
class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: null,
          followers: [],
          userPublications: [],
          avatar: null,
          publication_text: '',
          publication_img: '0',
          publication_vid: '0',
          lastScrollPos: 0,
          loading: false,
          page: 1,
          noMoreData: false,
          modalShow: false
        }
    
        this.loadMoreData = this.loadMoreData.bind(this);
      }
    
      componentDidMount() {
        Axios.defaults.headers.common['Authorization'] = localStorage.getItem('AUTH_TOKEN');
    
        Axios.get(BASE_URL + '/api/user').then((response) => {
          this.setState({ user: response.data });
        }).catch((error) => {
          console.log(error);
        });
    
        Axios.get(BASE_URL + '/api/userpublications').then((response) => {
          this.setState({ userPublications: response.data });
        }).catch((error) => {
          console.log(error);
        });
    
        Axios.get(BASE_URL + '/api/followers').then((response) => {
          this.setState({ followers: response.data });
        }).catch((error) => {
          console.log(error);
        });
    
        document.addEventListener('scroll', this.trackScrolling);
      }
    
      loadMoreData = () => {
    
        if (this.state.noMoreData && this.state.loading) {
          this.setState({ loading: false });
          return;
        }
    
        this.setState({ loading: true });
        Axios.get(BASE_URL + '/api/userpublications', {
          params: {
            page: this.state.page + 1
          }
        })
          .then((response) => {
            if (response && response.data) {
              this.setState(prevState => ({
                userPublications: prevState.userPublications.concat(response.data),
                loading: false,
                page: this.state.page + 1
              }));
            } else {
              this.setState({ noMoreData: true });
            }
          })
          .catch((error) => {
            console.log(error);
          }).finally(() => {
            this.setState({ loading: false });
          })
      }
    
      trackScrolling = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
    
        if (!this.state.noMoreData && !this.state.loading && this.state.lastScrollPos < scrolled && Math.ceil(scrolled) >= scrollable - 100) {
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
          Axios.post(BASE_URL + '/api/publish', {
            publication_img: this.state.publication_img,
            publication_vid: this.state.publication_vid,
            publication_text: this.state.publication_text
          }).then((response) => {
            console.log('uploading sucessful');
          }).catch((error) => {
            console.log(error);
          })
    
          return
        }
        const formData = new FormData();
        formData.append('post', this.state.avatar);
        formData.append('publication_text', this.state.publication_text);
        formData.append('publication_img', this.state.publication_img);
        formData.append('publication_vid', this.state.publication_vid);
    
        Axios.post(BASE_URL + '/api/publish', formData).then((response) => {
          console.log('uploading sucessful');
        }).catch((error) => {
          console.log(error);
        })
      }
    
      handlePublicatioText(e) {
        this.setState({ publication_text: e.target.value })
      }
    
    render() {
        return(
            <HomeView submit={this.onSubmit} handlePublicatioText={this.handlePublicatioText} stateFields = {this.state} />
        )
    }
}
export default HomeContainer