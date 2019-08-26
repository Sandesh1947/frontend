import React from 'react';
import { Alert, Col, Container, Image, Row, Spinner } from 'react-bootstrap';

import ContentCard from '../content-card/content-card';
import Left from '../left/left';
import Publication from '../publication/Publication';
import {Link} from 'react-router-dom'
import queryString from 'query-string';
import './home.scss';

export default class HomeView extends React.Component {
  render() {
    return (
      <section style={{ backgroundColor: '#f2f2f2', paddingBottom: '2rem', paddingTop:'1rem' }}> {/** TODO: extract styles to scss */}
        <Container className="content">
          <Row>
            <Col md={3}>
              <Left from='home' user={this.props.userInfo.user} />
            </Col>
            <Col md={6}>
              <Publication publicationType="update" />
              {this.props.userPublications.map((userPublication, index) => (
                <ContentCard
                  key={index}
                  postIndex={index}
                  userPublication={userPublication}
                  userPublications={this.props.userPublications}
                  loadMoreData={this.loadMoreData}
                />
              ))}

              {this.props.loading && <div className="mt-3 font-weight-bold">
                <Alert variant="light">
                  <Spinner animation="grow" size="sm" /> Loading...
                </Alert>
              </div>}

            </Col>
            <Col md={3}>
              <aside className="members">
                <h6 className="members__title">Influential members</h6>
                <div className="members__container">
                  {this.props.userFollowers && this.props.userFollowers.map((value, index) => {
                    return (
                      <div key={index} className="member d-flex flex-row align-items-start">
                        <Image className="member__avatar"
                          src={value.avatar} />
                        <div>
                          <h6 className="member__username"><Link to={{pathname:'/profile/',search: queryString.stringify(Object.assign({}, {user_id:value.id})),state:{currentuser:false}}}>{value.first_name + ' ' + value.last_name}</Link></h6>
                          <p>{value.email}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}