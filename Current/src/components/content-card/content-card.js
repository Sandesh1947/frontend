import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom'
import { Card, Image, Popover, Overlay ,Dropdown} from 'react-bootstrap';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  ;
import { BASE_URL } from '../../app.constants';
import { likePost, promotePost } from '../../actions/userPublicationAction'
import {unFollowUser } from '../../actions/userInfoActions'

import PromotedOrLikedUsersContainer from '../UserListModal/PromotedOrLikedUsersContainer'
import Popup from '../../components/popup/popup';
import VideoThumbnail from '../generic/VideoThumbnail';
import './content-card.scss';
class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <span onClick={this.handleClick}>
        {this.props.children}
      </span>
    );
  }
}

export default class ContentCard extends Component {
  static propTypes = {
    userPublication: PropTypes.object,
    userPublications: PropTypes.array.isRequired,
    postIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      postIndex: 0,
      modalShow: false,
      likeCount: props.userPublication.likes,
      promoteCount: props.userPublication.promote,
      isLiked: false,
      isPromoted: false,
      openUsersList: false,
      typeOfInterest: '',
      publicationId: null,
      showPopOver: []
    }
    this.handleOpenUsersList = this.handleOpenUsersList.bind(this)
    this.handleCloseUsersList = this.handleCloseUsersList.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.likePost = this.likePost.bind(this)
    this.promotePost = this.promotePost.bind(this)
    this.handlePopOver = this.handlePopOver.bind(this)
    this.handleBodyClick = this.handleBodyClick.bind(this)
    this.unFollow = this.unFollow.bind(this)
    this.refList = null;
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
  handleBodyClick(event) {
    let currentState = this.state.showPopOver
    if (event.target.id !== 'username-content') {
      currentState.forEach((element, key) => {
        if (currentState[key])
          currentState[key] = false
      });
      this.setState({ showPopOver: currentState })
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyDownEvent);
    document.addEventListener('click', this.handleBodyClick)

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownEvent);
    document.removeEventListener('click', this.handleBodyClick);
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.userPublication, prevProps.userPublication)) {
      this.setState({ likeCount: this.props.userPublication.likes, promoteCount: this.props.userPublication.promote })
    }
  }
  likePost(id) {
    this.setState({ likeCount: (this.state.likeCount + 1) })
    likePost(id).then(
      (res) => {
        this.setState({ likeCount: res.data.count, isLiked: true })
      },
      () => {
        this.setState({ likeCount: (this.state.likeCount - 1) })
      })
  }
  promotePost(id) {
    this.setState({ promoteCount: (this.state.promoteCount + 1) })
    promotePost(id).then(
      (res) => {
        this.setState({ promoteCount: res.data.count, isPromoted: true })
      },
      () => {
        this.setState({ promoteCount: (this.state.promoteCount - 1) })
      })
  }
  formatCount(count) {
    if (count) {
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
    else {
      return ''
    }
  }

  handleOpenUsersList(typeOfInterest, id) {
    this.setState({ typeOfInterest: typeOfInterest, openUsersList: true, publicationId: id })
  }
  handleCloseUsersList() {
    this.setState({ typeOfInterest: '', openUsersList: false })
  }
  handlePopOver(user, key) {
    if (user.currentuser === 0 && !this.state.showPopOver[key]) {
      let currentState = this.state.showPopOver
      currentState[key] = true
      this.setState({ showPopOver: currentState })
    }
    else {
      let currentState = this.state.showPopOver
      currentState[key] = false
      this.setState({ showPopOver: currentState })
    }
  }
  unFollow(user_id) {
    let postData = {
      'user_id':user_id
    }
    unFollowUser(postData);
  }
  render() {
    const { userPublication, userPublications } = this.props;
    return (
      <div className="content-card">
        <Popup
          show={this.state.modalShow}
          onHide={this.handleClose}
          onPrevClick={this.onPrevClick}
          onNextClick={this.onNextClick}
          userPublication={userPublications[this.state.postIndex]}
          likePost={this.likePost}
          promotePost={this.promotePost}
          likeCount={this.state.likeCount}
          promoteCount={this.state.promoteCount}
          isLiked={this.state.isLiked}
          isPromoted={this.state.isPromoted}
          formatCount={this.formatCount}
        />
        <Card style={{ border: 'none' }}>
          <Card.Header style={{ padding: 0 }}>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex">
                <Link to={{ pathname: '/profile/', search: queryString.stringify(Object.assign({}, { user_id: userPublication.user_id })), state: { currentuser: userPublication.currentuser } }}>
                  <Image className="content-card__avatar"
                    src={userPublication && BASE_URL + userPublication.avatar} />
                  </Link>
                  <span className="d-flex flex-column">
                  <Link to={{ pathname: '/profile/', search: queryString.stringify(Object.assign({}, { user_id: userPublication.user_id })), state: { currentuser: userPublication.currentuser } }}>
                    <h6
                      id='username-content' ref={refList => this.refList = refList} onClick={() => this.handlePopOver(userPublication, this.props.postIndex)} className="content-card__username">{userPublication && (userPublication.first_name + ' ' + userPublication.last_name)}</h6>
                  </Link>
                    <Overlay
                      show={this.state.showPopOver[this.props.postIndex]}
                      target={this.refList}
                      placement="bottom"

                    >
                      <Popover id="popover-contained" title="View Profile">
                        <strong><Link to={{ pathname: '/profile/', search: queryString.stringify(Object.assign({}, { user_id: userPublication.user_id })), state: { currentuser: userPublication.currentuser } }}>Click to view profile of {userPublication.first_name}</Link></strong>
                      </Popover>
                    </Overlay>
                    {userPublication && !isNaN(Date.parse(userPublication.created_at)) &&
                      <p className="content-card__date"><ReactTimeAgo
                        date={new Date(userPublication.created_at)} /></p>}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-end text-right right flex-column">
                <span className="content-card__button">
                  <Dropdown>
                  <Dropdown.Toggle  as={CustomToggle} id="dropdown-basic">
                  <FontAwesomeIcon icon={faEllipsisH} className="content-card__icon" />
                      <Dropdown.Menu >
                      {((this.state.isPromoted || userPublication.promoted) || (this.state.isLiked || userPublication.liked)) ?
                        <Dropdown.Item eventKey="1" onClick={() => { this.promotePost(userPublication.id) }}>Promote Piece</Dropdown.Item> : 
                        <Dropdown.Item eventKey="1"><span className='count-value like-done '>Promote Piece</span></Dropdown.Item> 
                        }
                        <Dropdown.Item eventKey="2">Add To Collection</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={() => {this.unFollow(userPublication.user_id)}}>Unfollow</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown.Toggle>
                  </Dropdown>
                </span>
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
              <VideoThumbnail className="content-card__video" src={BASE_URL + userPublication.post} onClick={this.showPopup} />
            )}

          </Card.Body>
          <Card.Footer style={{ margin: '0 -1rem', padding: '1rem 1rem 0', borderTopColor: '#f2f2f2' }}>
            <div className='content-card-footer d-flex justify-content-between'>
              <div className='content-card-footer__item'>
                {((this.state.isLiked || userPublication.liked) || (this.state.isPromoted || userPublication.promoted ) )?
                  <span><span onClick={() => { this.handleOpenUsersList('liked', userPublication.id) }} className='count-value'>{this.formatCount(this.state.likeCount)}</span> <span className='count-value like-done '>Like</span></span> :
                  <span><span className='count-value' onClick={() => { this.handleOpenUsersList('liked', userPublication.id) }}>{this.formatCount(this.state.likeCount)} </span> <span onClick={() => { this.likePost(userPublication.id) }} className='count-value'>Like</span> </span>}
              </div>
              <div className='content-card-footer__item'>
                {((this.state.isPromoted || userPublication.promoted) || (this.state.isLiked || userPublication.liked)) ?
                  <span><span onClick={() => { this.handleOpenUsersList('promotes', userPublication.id) }} className='count-value'>{this.formatCount(this.state.promoteCount)}</span> <span className='count-value like-done '>Promote</span></span> :
                  <span><span onClick={() => { this.handleOpenUsersList('promotes', userPublication.id) }} className='count-value'>{this.formatCount(this.state.promoteCount)}</span><span onClick={() => { this.promotePost(userPublication.id) }} className='count-value'> Promote</span></span>
                }
              </div>
            </div>
          </Card.Footer>
        </Card>
        {this.state.openUsersList && <PromotedOrLikedUsersContainer close={this.handleCloseUsersList} type={this.state.typeOfInterest} id={this.state.publicationId} />}
      </div>
    );
  }
}
