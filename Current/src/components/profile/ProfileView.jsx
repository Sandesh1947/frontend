import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Left from '../left/left';
import Right from '../right/right';
class ProfileView extends React.Component {
    render() {
        return (
            <section style={{ backgroundColor: '#f2f2f2' }}>
                <Container className='content'>
                    <Row>
                        <Col md={{ span: 3, offset: 1 }}>
                            <Left partners={this.props.userPartners} followers={this.props.userFollowers} user={this.props.userInfo} />
                        </Col>
                        <Col md={7}>
                            <Right loading={this.props.loading} user={this.props.userInfo} userPublications={this.props.userPublications} />
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}
export default ProfileView