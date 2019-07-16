import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Left from '../left/left';
import ProfileCenter from '../profileCenter/ProfileCenter';
import Button from 'react-bootstrap/Button'
export default class ProfileView extends React.Component {
  render() {
    return (
      <section style={{ backgroundColor: '#f2f2f2' }}>
        <Container className="content">
          <Row>
            <Col md={3}>
              <Left
                partners={this.props.userPartners}
                followers={this.props.userFollowers}
                user={this.props.userInfo.user}
              />
            </Col>
            <Col md={6}>
              <ProfileCenter
                loading={this.props.loading}
                user={this.props.userInfo.user}
                userPublications={this.props.userPublications}
              />
            </Col>
            <Col md={3}>
              {this.props.currentUserState === 1 ? <Button  variant="secondary" className='mt-2' size="lg">Edit Profile</Button> : (this.props.currentUserState === 0 ?<Button  variant="secondary" className='mt-2' size="lg">Connect </Button> :'')}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}