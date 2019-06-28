import React from 'react';
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
import ContentCard from '../content-card/content-card';
import Left from '../left/left';
import { faFilm, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './home.scss';
export default class HomeView extends React.Component {
    render() {
        return (
          <section style={{ backgroundColor: '#f2f2f2', paddingBottom: '2rem' }}>
            <Container className='content'>
              <Row>
                <Col md={3}>
                  <Left user={this.props.userInfo.user} />
                </Col>
                <Col md={6}>
                  <Card className='posting-card-wrapper'>
                    <Card.Body style={{ padding: '1rem' }} className='posting-card-body'>
                      <div className='d-flex posting-card'>
                        {this.props.userInfo.user && this.props.userInfo.user.avatar &&
                          (
                            <Image src={BASE_URL + this.props.userInfo.user.avatar} className='posting-card__avatar' /> // TODO: fix avatar size
                          )}
                        <div className='posting-card__control'>
                          <Form.Control style={{ resize: 'none' }} placeholder='Share with the world your latest piece...'
                            as='textarea' rows='3' value={this.props.stateFields.publication_text} onChange={this.props.handlePublicatioText.bind(this)} className='posting-card__textarea' />
                          <div className='d-flex justify-content-between'>
                            <div className='posting-card-attachment'>
                              {this.props.stateFields.publication_vid === '0' && (
                                <div className='btn posting-card-attachment__button'>
                                  <label htmlFor='image' className='m-0 p-0 posting-card-attachment__label'>
                                    <FontAwesomeIcon icon={faImage} size='2x'
                                      className='cursor-pointer posting-card-attachment__icon' />
                                  </label>
                                  <input className='d-none' type='file' id='image' onChange={this.onFileUpload}
                                    accept='image/x-png,image/jpeg' />
                                </div>
                              )}
    
                              {this.props.stateFields.publication_img === '0' && (
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
                              onClick={this.props.submit}
                              className='posting-card__button'>Publish</Button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  {this.props.userPublications && this.props.userPublications.map((value, index) => {
                    return <ContentCard key={index} id={index} user={this.props.userInfo.user} userPublications={value} userPublicationsArray={this.props.userPublications} loadMoreData={this.loadMoreData} />
                  })}
    
                  {this.props.stateFields.loading && <div className='mt-3 font-weight-bold'>
                    <Alert variant='light'>
                      <Spinner animation='grow' size='sm' /> Loading...
                    </Alert>
                  </div>}
    
                </Col>
                <Col md={3}>
                  <aside className='members'>
                    <h6 className='members__title'>Influential members</h6>
                    <div className='members__container'>
                      {this.props.userFollowers&& this.props.userFollowers.map((value, index) => {
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
          </section>)
}
}