import { faFilm, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { BASE_URL } from '../../app.constants';
import ContentCard from '../../components/content-card/content-card';
import Left from '../../components/left/left';
// import './home.scss';

export default class Home extends Component {

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
    // if (!localStorage.getItem('AUTH_TOKEN') || localStorage.getItem('AUTH_TOKEN') === '') {
    //   this.props.history.replace('/login');
    //   return;
    // }

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
    return (
      <section style={{ backgroundColor: '#f2f2f2', paddingBottom: '2rem' }}>
        <Container className='content'>
          <Row>
            <Col md={3}>
              <Left user={this.state.user} />
            </Col>
            <Col md={6}>
              <Card className='posting-card-wrapper'>
                <Card.Body style={{ padding: '1rem' }} className='posting-card-body'>
                  <div className='d-flex posting-card'>
                    {this.state.user && this.state.user.avatar &&
                      (
                        <Image src={BASE_URL + this.state.user.avatar} className='posting-card__avatar' /> // TODO: fix avatar size
                      )}
                    <div className='posting-card__control'>
                      <Form.Control style={{ resize: 'none' }} placeholder='Share with the world your latest piece...'
                        as='textarea' rows='3' value={this.state.publication_text} onChange={this.handlePublicatioText.bind(this)} className='posting-card__textarea' />
                      <div className='d-flex justify-content-between'>
                        <div className='posting-card-attachment'>
                          {this.state.publication_vid === '0' && (
                            <div className='btn posting-card-attachment__button'>
                              <label htmlFor='image' className='m-0 p-0 posting-card-attachment__label'>
                                <FontAwesomeIcon icon={faImage} size='2x'
                                  className='cursor-pointer posting-card-attachment__icon' />
                              </label>
                              <input className='d-none' type='file' id='image' onChange={this.onFileUpload}
                                accept='image/x-png,image/jpeg' />
                            </div>
                          )}

                          {this.state.publication_img === '0' && (
                            <div className='btn posting-card-attachment__button'>
                              <label htmlFor='video' className='m-0 posting-card-attachment__label'>
                                <FontAwesomeIcon icon={faFilm} size='2x'
                                  className='cursor-pointer posting-card-attachment__icon' />
                              </label>
                              <input className='d-none' type='file' id='video' onChange={this.onFileUpload}
                                accept='video/mp4' />
                            </div>
                          )}
                        </div>
                        <Button
                          style={{ padding: '0 1rem' }}
                          onClick={this.onSubmit}
                          className='posting-card__button'>Publish</Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              {this.state.userPublications && this.state.userPublications.map((value, index) => {
                return <ContentCard key={index} id={index} user={this.props.user} userPublications={value} userPublicationsArray={this.state.userPublications} loadMoreData={this.loadMoreData} />
              })}

              {this.state.loading && <div className='mt-3 font-weight-bold'>
                <Alert variant='light'>
                  <Spinner animation='grow' size='sm' /> Loading...
                </Alert>
              </div>}

            </Col>
            <Col md={3}>
              <aside className='members'>
                <h6 className='members__title'>Influential members</h6>
                <div className='members__container'>
                  {this.state.followers && this.state.followers.map((value, index) => {
                    return (
                      <div key={index} className='member d-flex flex-row align-items-start'>
                        <Image className='member__avatar'
                          src={require('../../assets/avatar.png')} />
                        <h6 className='member__username'>{value.first_name + ' ' + value.last_name}</h6>
                      </div>
                    )
                  })}
                </div>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}
