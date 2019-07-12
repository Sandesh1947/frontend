import React from 'react';
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { BASE_URL } from '../../app.constants';

import './modal.scss';

class PromotedOrLikedUsersView extends React.Component {
  render() {
    console.log(this.props)
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
                      <span>{user.first_name} {user.last_name}</span>
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
                      <span>{user.first_name} {user.last_name}</span>
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