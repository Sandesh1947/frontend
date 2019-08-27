import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Left from '../left/left';
import ProfileCenter from '../profileCenter/ProfileCenter';
import { Link } from 'react-router-dom'
export default class ProfileView extends React.Component {
  render() {
    const user = this.props.userInfo.user ? this.props.userInfo.user[0]:undefined
    return (
      <section style={{ backgroundColor: '#f2f2f2',paddingTop:'1rem' }}>
        <Container className="content">
          <Row>
            <Col md={2}>
              <Left
                from='profile'
                partners={this.props.userPartners}
                followers={this.props.userFollowers}
                user={this.props.userInfo.user}
                editProfile={this.props.editProfile}
              />
            </Col>
            <Col md={8}>
              <ProfileCenter
                loading={this.props.loading}
                user={this.props.userInfo.user}
                userPublications={this.props.userPublications}
                editProfile={this.props.editProfile}
              />
            </Col>
            <Col md={2}>
              {this.props.currentUserState === 1 ? <Link to='/settings/editprofile' className='mt-2 btn edit-profile-button-background'>Edit Profile</Link> : 
              (this.props.currentUserState === 0 ? (user && user.followed === 1 ? <button className='mt-2  btn edit-profile-button-background'>Connected </button> :<button  className='mt-2  btn edit-profile-button-background'>Connect </button> ) :'')}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}