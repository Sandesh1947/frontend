import { faBell, faCommentAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BASE_URL } from '../../app.constants';

import PublicationModal from '../publication-modal/PublicationModal';

import './header.scss';

class Header extends Component {
  state = {
    showPublicationModal: false,
  }

  showPublicationModal = () => {
    this.setState({ showPublicationModal: true });
  }

  hidePublicationModal = () => {
    this.setState({ showPublicationModal: false });
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <header className="header">
        <PublicationModal
          user={this.props.user}
          show={this.state.showPublicationModal}
          onShow={this.showPublicationModal}
          onHide={this.hidePublicationModal}
          // TODO: once posted - hide publication modal, use some new redux action 
          // to notify about publication submit success/failure
          onSubmit={this.props.onSubmitPublication}
        />
        <Container>
          <Row>
            <Col>
              <Navbar expand="lg" className="navbar">
                <Navbar.Brand className="navbar__brand"><Link to="/home">Eycon</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
                  <Form inline className="navbar-search-form">
                    <FormControl size="sm" type="text"
                      className="mr-sm-2 navbar-search-form__control"
                      style={{ backgroundColor: '#f2f2f2' }}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon navbar-search-form__icon" style={{ color: '#dcdcdc' }} />
                  </Form>
                  <Nav className="mr-5 w-100 justify-content-end navbar-control">
                    <Button variant="light" className="navbar-control__button" onClick={this.showPublicationModal}>
                      <h3 className="navbar-control__text">Create</h3>
                      <FontAwesomeIcon icon={faPlus} className="navbar-control__icon" />
                    </Button>
                  </Nav>
                  <Nav className="navbar-right">
                    <Button variant="light" className="navbar-right__button">
                      <FontAwesomeIcon icon={faCommentAlt} className="navbar-right__icon" />
                    </Button>
                    <Button variant="light" className="navbar-right__button">
                      <FontAwesomeIcon icon={faBell} className="navbar-right__icon" />
                    </Button>
                    <NavDropdown
                      title={this.props.user && (this.props.user.first_name + ' ' + this.props.user.last_name)}
                      id="basic-nav-dropdown"
                      className="navbar-dropdown"
                    >
                      {(pathname === '/home') &&
                        <Link className="dropdown-item navbar-dropdown__item" to="/profile">Profile</Link>}
                      {(pathname === '/profile') &&
                        <Link className="dropdown-item navbar-dropdown__item" to="/home">Home</Link>}
                      <NavDropdown.Item
                        href="#"
                        className="navbar-dropdown__item"
                      >
                        Settings
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="navbar-dropdown__item"
                        onClick={() => {
                          localStorage.removeItem('AUTH_TOKEN');
                          this.props.history.replace('/login');
                        }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <figure className="navbar-avatar">
                      <Image src={this.props.user && BASE_URL + this.props.user.avatar}
                        className="navbar-avatar__image" />
                    </figure>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default withRouter(Header);