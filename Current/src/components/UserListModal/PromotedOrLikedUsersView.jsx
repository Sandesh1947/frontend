import React from 'react';
import { BASE_URL } from '../../app.constants';
import { Link } from 'react-router-dom'
import { Popover, Overlay, Row, Col, Modal, Spinner } from 'react-bootstrap';
import queryString from 'query-string';
import './modal.scss';
class UserNameFormatter extends React.Component {
  constructor() {
    super()
    this.state = { showPopOver: [] }
    this.handlePopOver = this.handlePopOver.bind(this)
    this.handleBodyClick = this.handleBodyClick.bind(this)
    this.refList = null;
  }
  componentDidMount() {
    document.addEventListener('click', this.handleBodyClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleBodyClick);
  }
  handleBodyClick(event) {
    let currentState = this.state.showPopOver
    if (event.target.id !== 'likedusers') {
      currentState.forEach((element, key) => {
        if (currentState[key])
          currentState[key] = false
      });
      this.setState({ showPopOver: currentState })
    }
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
  render() {
    const { user, index } = this.props
    return (
      <React.Fragment>
        <span id='likedusers' className='user-name' ref={refList => this.refList = refList} onClick={() => this.handlePopOver(user, index)} >{user.first_name} {user.last_name}</span>
        <Overlay
          show={this.state.showPopOver[index]}
          target={this.refList}
          placement="bottom"

        >
          <Popover id="popover-contained" title="View Profile">
            <strong><Link to={{ pathname: '/profile/', search: queryString.stringify(Object.assign({}, { id: user.id })), state: { currentuser: user.currentuser } }}>Click to view profile of {user.first_name}</Link></strong>
          </Popover>
        </Overlay>
      </React.Fragment>
    )
  }
}


class PromotedOrLikedUsersView extends React.Component {
  render() {
    const { likedUsers, type, promotedUsers } = this.props;
    return (
      <Modal show={true} onHide={this.props.close} className="promoted-liked-users-modal">
        <Modal.Header closeButton>
          <Modal.Title>{type === 'liked' ? 'Liked By' : 'Promoted By'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {type === 'liked' ? <React.Fragment>{
            likedUsers.users.map(
              (user, key) => (
                <Row key={key} className="user-item-container">
                  <Col className="flex-container" md={4}>
                    <span><img className="user-image" src={BASE_URL + user.avatar} alt="avatar" /></span>
                    <div className="flex-container flex-direction-column user-details-div">
                      <UserNameFormatter user={user} index={key} />
                      <span>@{user.email}</span>
                    </div>
                  </Col>
                </Row>
              )
            )
          }
            {likedUsers.loading
              ? <div className="text-center"><Spinner animation="border" /></div>
              : !likedUsers.noMoreData
                ? <div onClick={this.props.loadMore} className="load-more-link">Load More</div>
                : <div className="text-center">No More Data</div>

            }
          </React.Fragment> : <React.Fragment>
              {promotedUsers.users.map(
                (user, key) => (
                  <Row key={key} className="user-item-container">
                    <Col className="flex-container" md={4}>
                      <span><img className="user-image" src={BASE_URL + user.avatar} alt="avatar" /></span>
                      <div className="flex-container flex-direction-column user-details-div">
                      <UserNameFormatter user={user} index={key} />
                        <span>@{user.email}</span>
                      </div>
                    </Col>
                  </Row>
                ))}
              {promotedUsers.loading
                ? <div className="text-center"><Spinner animation="border" /></div>
                : !promotedUsers.noMoreData
                  ? <div onClick={this.props.loadMore} className="load-more-link">Load More</div>
                  : <div className="text-center">No More Data</div>
              }
            </React.Fragment>
          }
        </Modal.Body>
      </Modal>
    );
  }
}
export default PromotedOrLikedUsersView;