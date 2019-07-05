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
import { likePost, promotePost } from '../../actions/publicationAction'

export default class ContentCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postIndex: 0,
      modalShow: false,
      updatedLikes: null,
      updatedPromotes: null,
      isLiked: false,
      isPromoted: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.likePost = this.likePost.bind(this)
    this.promotePost = this.promotePost.bind(this)
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
  likePost(id) {
    likePost(id).then((res) => {
      this.setState({ updatedLikes: res.data.count, isLiked: true })
    })
  }
  promotePost(id) {
    promotePost(id).then((res) => {
      this.setState({ updatedPromotes: res.data.count, isPromoted: true })
    })
  }
  formatCount(count) {
    if (count < 1000) {
      return count;
    }
    else if (count < 1000000) {
      return count / 1000 + 'K'
    }
    else {
      return count / 1000000 + 'M'
    }
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
                {(this.state.isLiked || this.props.userPublications.liked)? 
                  <span className='like-done'>{this.formatCount(this.state.updatedLikes ? this.state.updatedLikes : this.props.userPublications.likes)} Like</span> :
                  <Button onClick={() => { this.likePost(this.props.userPublications.id) }} className='content-card-footer__button'>{this.formatCount(this.state.updatedLikes ? this.state.updatedLikes : this.props.userPublications.likes)} Like</Button> }
              </div>
              <div className='content-card-footer__item'>
              {(this.state.isPromoted || this.props.userPublications.promoted)?
              <span className='like-done'>{this.formatCount(this.state.updatedLikes ? this.state.updatedLikes : this.props.userPublications.likes)} Promote</span> :
              <Button onClick={() => { this.promotePost(this.props.userPublications.id) }} className='content-card-footer__button'>{this.formatCount(this.state.updatedPromotes ? this.state.updatedPromotes : this.props.userPublications.promote)} Promote</Button>
              }
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}
