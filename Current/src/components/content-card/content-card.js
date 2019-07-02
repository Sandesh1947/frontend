import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import { Button, Card, Image } from 'react-bootstrap';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Popup from '../../components/popup/popup';

import { BASE_URL } from '../../app.constants';
import './content-card.scss';

export default class ContentCard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    userPublication: PropTypes.object,
    userPublications: PropTypes.array.isRequired,
    postIndex: PropTypes.number.isRequired,

    loadMoreData: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    onPromote: PropTypes.func.isRequired,
  }

  state = {
    postIndex: 0,
    modalShow: false,
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
    if (this.state.postIndex < this.props.userPublications.length - 1) {
      this.setState({ postIndex: this.state.postIndex + 1 });
    }

    if (this.state.postIndex === this.props.userPublications.length - 1) {
      this.props.loadMoreData();
    }
  }

  showPopup = () => {
    this.setState({ modalShow: true, postIndex: this.props.postIndex });
  }

  keyDownEvent = (e) => {
    if (e.keyCode === 39) {
      this.onNextClick();
    } else if (e.keyCode === 37) {
      this.onPrevClick();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownEvent);
  }

  render() {
    const { user, userPublication, userPublications } = this.props;

    return (
      <div className="content-card">
        <Popup
          show={this.state.modalShow}
          onHide={this.handleClose}
          onPrevClick={this.onPrevClick}
          onNextClick={this.onNextClick}
          user={user}
          userPublication={userPublications[this.state.postIndex]}
        />
        <Card style={{ border: 'none' }}>
          <Card.Header style={{ padding: 0 }}>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex">
                  <Image className="content-card__avatar"
                    src={userPublication && BASE_URL + userPublication.avatar} />
                  <span className="d-flex flex-column">
                    <h6
                      className="content-card__username">{userPublication && (userPublication.first_name + ' ' + userPublication.last_name)}</h6>
                    {userPublication && !isNaN(Date.parse(userPublication.created_at)) &&
                      <p className="content-card__date"><ReactTimeAgo
                        date={new Date(userPublication.created_at)} /></p>}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-end text-right right flex-column">
                <a href="#" className="content-card__button">
                  <FontAwesomeIcon icon={faEllipsisH} className="content-card__icon" />
                </a>
                <p className="content-card__public">Public</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body style={{ padding: '1rem 0' }}>
            {userPublication && userPublication.publication_text && (
              <p className="content-card__text">
                {userPublication.publication_text}
              </p>
            )}

            {userPublication && userPublication.publication_img === '1' &&
              <Image className="content-card__image" src={BASE_URL + userPublication.post} onClick={this.showPopup} />
            }

            {userPublication && userPublication.publication_vid === '1' && (
              <Image className="content-card__image" src={BASE_URL + userPublication.vid_thumbnail} onClick={this.showPopup} />
            )}

          </Card.Body>
          <Card.Footer style={{ margin: '0 -1rem', padding: '1rem 1rem 0', borderTopColor: '#f2f2f2' }}>
            <div className="content-card-footer d-flex justify-content-between">
              <div className="content-card-footer__item">
                <Button className="content-card-footer__button" onClick={this.props.likePublication}>Admire</Button>
              </div>
              <div className="content-card-footer__item">
                <Button className="content-card-footer__button" onClick={this.props.promotePublication}>Promote</Button>
                <Button className="content-card-footer__button">Comment</Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
