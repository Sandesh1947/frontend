import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { LoadingSpinner, Player } from 'video-react';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../app.constants';
import { fetchPromotedUsers, clearPromotedUsers } from '../../actions/userPublicationAction'

import './popup.scss';

class Popup extends Component {
  onModalShow = () => {
    // TODO: use react refs instead
    var prev = document.getElementsByClassName('carousel-control-prev')[0];
    var next = document.getElementsByClassName('carousel-control-next')[0];
    var modal = document.getElementsByClassName('modal')[0];
    modal.prepend(prev);
    modal.append(next);
  }
  componentDidMount() {
    if (this.props.show) {
      this.props.fetchPromotedUsers(this.props.userPublication.id);
    }
  }
  componentDidUpdate(prevProps) {
    if ((prevProps.show !== this.props.show) && this.props.show)
      this.props.fetchPromotedUsers(this.props.userPublication.id);
  }
  componentWillUnmount() {
    this.props.clearPromotedUsers()
  }
  render() {
    const { userPublication, show, onHide, likeCount, promoteCount, promotedUsers } = this.props;
    return (
      <Modal show={show} onShow={this.onModalShow} onHide={onHide} >
        <div className="carousel-control-prev" role="button" onClick={this.props.onPrevClick}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </div>
        <div className="carousel-control-next" role="button" onClick={this.props.onNextClick}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </div>
        <Modal.Header closeButton>
          <div className="d-flex flex-row justify-content-center w-100">
            <div className="d-flex flex-column align-items-center">
              <Image className="header-avatar" src={userPublication && BASE_URL + userPublication.avatar} />
              <div className="header-title">{userPublication && (userPublication.first_name + ' ' + userPublication.last_name)}</div>
              {userPublication && !isNaN(Date.parse(userPublication.created_at)) &&
                <span className="header-ago"><ReactTimeAgo date={new Date(userPublication.created_at)} /> - Public</span>
              }
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {userPublication && userPublication.publication_text &&
            <div>{userPublication.publication_text}</div>
          }

          {userPublication && userPublication.publication_img === '1' &&
            <Image className="body-post-image" src={BASE_URL + userPublication.post} />
          }

          {userPublication && userPublication.publication_vid === '1' && (
            <Player
              playsInline
              src={BASE_URL + userPublication.post}
              autoPlay={true}
            >
              <LoadingSpinner />
            </Player>
          )}
          <div className="d-flex justify-content-between align-items-center mt-1">
            <span className="like"><FontAwesomeIcon icon={['far', 'heart']} color="#bebebe" /> {this.props.formatCount(likeCount)}</span>
            <span className="like" style={{ color: '#bebebe', fontWeight: '400' }}>|</span>
            <span className="d-flex align-items-center">
              <span className="like"><FontAwesomeIcon icon={['fas', 'share']} color="#bebebe" /> {this.props.formatCount(promoteCount)}</span>
              <span className="like d-flex align-items-center">&nbsp;Promoted by&nbsp;&nbsp;&nbsp;&nbsp;
                {promotedUsers.users.slice(0, 4).map((user, key) => (
                <Image key={key} className="promoted-by-image" src={BASE_URL + user.avatar} />
              ))}
              </span>
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 footer-buttons">
            <Button disabled={userPublication.liked || this.props.isLiked} onClick={() => this.props.likePost(userPublication.id)} variant="light">Like</Button>
            <Button disabled={userPublication.promoted || this.props.isPromoted} onClick={() => this.props.promotePost(userPublication.id)} variant="light">Promote</Button>
          </div>
          <div className="d-flex w-100">
            <Image className="footer-avatar" src={userPublication && BASE_URL + userPublication.avatar} />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  promotedUsers: state.promotedUsers,
});
const mapDispatchersToProps = {
  clearPromotedUsers,
  fetchPromotedUsers
};
export default connect(mapStateToProps, mapDispatchersToProps)(Popup)
