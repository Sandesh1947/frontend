import { faBell, faCommentAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BASE_URL } from '../../app.constants';

import PublicationModal from '../publication-modal/PublicationModal';

import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPublicationModal: false,
      searchKeyword: '',
    };
  }

  handleSearch = event => {
    this.setState({ searchKeyword: event.target.value });
    this.props.redirectPage(event.target.value);
  }

  showPublicationModal = () => {
    this.setState({ showPublicationModal: true });
  }

  hidePublicationModal = () => {
    this.setState({ showPublicationModal: false });
  }

  handleSubmitSearchForm = event => {
    event.preventDefault();
    this.props.onSubmitSearchKeyword(this.state.searchKeyword);
  }

  handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    this.props.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <>
        <header className="header">
          <Navbar fixed="top" expand="lg" bg="light" collapseOnSelect>
            <Container>
              <Navbar.Brand><Link to="/home">Eycon</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {this.searchField}
                {this.createPublicationLink}
                <Nav className="navbar-right">
                  {this.messages}
                  {this.notifications}
                  {this.menuDropdown}
                  {this.avatar}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <PublicationModal
          show={this.state.showPublicationModal}
          onShow={this.showPublicationModal}
          onHide={this.hidePublicationModal}
        />
      </>
    );
  }

  get searchField() {
    return (
      <Form onSubmit={this.handleSubmitSearchForm} inline className="navbar-search-form">
        <FormControl onChange={this.handleSearch} size="sm" type="text" className="mr-sm-2" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </Form>
    );
  }

  get createPublicationLink() {
    return (
      <Nav className="mr-5 w-100 justify-content-end create-publication">
        <Button variant="light" onClick={this.showPublicationModal}>
          <h3>Create</h3>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Nav>
    );
  }

  get messages() {
    return (
      <Button variant="light">
        <FontAwesomeIcon icon={faCommentAlt} />
      </Button>
    );
  }

  get notifications() {
    return (
      <Button variant="light">
        <FontAwesomeIcon icon={faBell} />
      </Button>
    );
  }

  get menuDropdown() {
    const { pathname } = this.props.location;
    return (
      <NavDropdown title={this.userFullName} id="main-menu-dropdown">
        {pathname !== '/profile' && (
          <NavDropdown.Item as="div">
            <Link to="/profile">Profile</Link>
          </NavDropdown.Item>
        )}
        {pathname !== '/home' && (
          <NavDropdown.Item as="div">
            <Link to="/home">Home</Link>
          </NavDropdown.Item>
        )}
        <NavDropdown.Item as="div">
          <Link to="#">Settings</Link>
        </NavDropdown.Item>
        <NavDropdown.Item as="div" onClick={this.handleLogout}>
          <Link to="#">Logout</Link>
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  get avatar() {
    return this.user && (
      <figure className="navbar-avatar">
        <Image src={BASE_URL + this.user.avatar} />
      </figure>
    );
  }

  get user() {
    // TODO: refactor parent container so that user is passed as object instead of array
    return this.props.user && this.props.user[0];
  }

  get userFullName() {
    return this.user && (this.user.first_name + ' ' + this.user.last_name)
  }
}

export default (withRouter(Header));