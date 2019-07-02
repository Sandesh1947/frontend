import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import titleTop from '../../assets/title-top.png';
import ContentCard from '../content-card/content-card';
import './right.scss';

export default class Right extends Component {
  render() {
    return (
      <div className="right">
        <figure className="title-img">
          <Image src={titleTop} className="title-img__image" />
        </figure>

        <div className="button-group categories">
          <ButtonGroup size="lg" className="categories-list categories__item">
            <Button className="categories-list__item" variant="light" style={{ fontSize: '.875rem', background: 'none', border: '3px solid transparent', padding: '.75rem 1rem' }}>Publications</Button>
            <Button className="categories-list__item" variant="light" style={{ fontSize: '.875rem', background: 'none', border: '3px solid transparent', padding: '.75rem 1rem' }}>Audience</Button>
            <Button className="categories-list__item" variant="light" style={{ fontSize: '.875rem', background: 'none', border: '3px solid transparent', padding: '.75rem 1rem' }}>Influence</Button>
            <Button className="categories-list__item" variant="light" style={{ fontSize: '.875rem', background: 'none', border: '3px solid transparent', padding: '.75rem 1rem' }}>Partners</Button>
          </ButtonGroup>
          <Dropdown className="right-dropdown categories__item">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="right-dropdown__toggle" style={{ fontSize: '.875rem', fontWeight: 'bold', background: 'none', border: '3px solid transparent', padding: '.75rem 1rem' }}>
              More
            </Dropdown.Toggle>
            <Dropdown.Menu className="right-dropdown-menu">
              <Dropdown.Item className="right-dropdown-menu__item" href="#/action-1" style={{ fontSize: '1rem' }}>Action</Dropdown.Item>
              <Dropdown.Item className="right-dropdown-menu__item" href="#/action-2" style={{ fontSize: '1rem' }}>Another action</Dropdown.Item>
              <Dropdown.Item className="right-dropdown-menu__item" href="#/action-3" style={{ fontSize: '1rem' }}>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {this.props.userPublications.map((userPublication, index) => (
          <ContentCard
            key={index}
            postIndex={index}
            user={this.props.user}
            userPublication={userPublication}
            userPublications={this.props.userPublications}
            likePublication={() => this.props.likePublication({ id: userPublication.id })}
            promotePublication={() => this.props.promotePublication({ id: userPublication.id })}
          />
        ))}

        {this.props.loading && <div className="mt-3 font-weight-bold">
          <Alert variant="light">
            <Spinner animation="grow" size="sm" /> Loading...
          </Alert>
        </div>}
      </div>
    );
  }
}
