import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ReactTimeAgo from 'react-time-ago';
import { BASE_URL } from '../../app.constants';
import Popup from "../../components/popup/popup";
import './content-card.scss';

export default class ContentCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postIndex: 0,
      modalShow: false
    }

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  }

  onPrevClick = () => {
    if (this.state.postIndex > 0) {
      this.setState({ postIndex: this.state.postIndex - 1 });
    }
  }

  onNextClick = () => {
    if (this.state.postIndex < this.props.userPublicationsArray.length - 1) {
      this.setState({ postIndex: this.state.postIndex + 1 });
    }

    if (this.state.postIndex === this.props.userPublicationsArray.length - 1) {
      this.props.loadMoreData();
    }
  }

  onClick = () => {
    this.setState({ modalShow: true, postIndex: this.props.id });
  }

  keyDownEvent = (e) => {
    if (e.keyCode === 39) {
      this.onNextClick();
    } else if (e.keyCode === 37) {
      this.onPrevClick();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownEvent);
  }

  render() {
    return (
      <div className='content-card'>
        <Popup show={this.state.modalShow} onHide={this.handleClose} onPrevClick={this.onPrevClick} onNextClick={this.onNextClick} userPublications={this.props.userPublicationsArray[this.state.postIndex]} />
        <Card style={{ border: 'none' }}>
          <Card.Header style={{ padding: 0 }}>
            <div className='d-flex justify-content-between'>
              <div>
                <div className='d-flex'>
                  <Image className='content-card__avatar'
                    src={this.props.userPublications && BASE_URL + this.props.userPublications.avatar} />
                  <span className='d-flex flex-column'>
                    <h6
                      className='content-card__username'>{this.props.userPublications && (this.props.userPublications.first_name + ' ' + this.props.userPublications.last_name)}</h6>
                    {this.props.userPublications && !isNaN(Date.parse(this.props.userPublications.created_at)) &&
                      <p className='content-card__date'><ReactTimeAgo
                        date={new Date(this.props.userPublications.created_at)} /></p>}
                  </span>
                </div>
              </div>
              <div className='d-flex justify-content-end text-right right flex-column'>
                <a href='#' className='content-card__button'>
                  <FontAwesomeIcon icon={faEllipsisH} className='content-card__icon' />
                </a>
                <p className='content-card__public'>Public</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body style={{ padding: '1rem 0' }}>
            {this.props.userPublications && this.props.userPublications.publication_text && (
              <p className='content-card__text'>
                {this.props.userPublications.publication_text}
              </p>
            )}

            {this.props.userPublications && this.props.userPublications.publication_img === '1' &&
              <Image className='content-card__image' src={BASE_URL + this.props.userPublications.post} onClick={this.onClick} />
            }

            {this.props.userPublications && this.props.userPublications.publication_vid === '1' && (
              <Image className='content-card__image' src={BASE_URL + this.props.userPublications.vid_thumbnail} onClick={this.onClick} />
            )}

          </Card.Body>
          <Card.Footer style={{ margin: '0 -1rem', padding: '1rem 1rem 0', borderTopColor: '#f2f2f2' }}>
            <div className='content-card-footer d-flex justify-content-between'>
              <div className='content-card-footer__item'>
                <Button className='content-card-footer__button'>Admire</Button>
              </div>
              <div className='content-card-footer__item'>
                <Button className='content-card-footer__button'>Promote</Button>
                <Button className='content-card-footer__button'>Comment</Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}
