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
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSubmitSearchForm = (event) => {
    event.preventDefault();
    this.props.onSubmitSearchKeyword(this.state.searchKeyword);
  }

  render() {
    const { user } = this.props;
    const { pathname } = this.props.location;
    return (
      <>
        <header className="header">
          <Navbar fixed="top" expand="lg" bg="light" collapseOnSelect>
            <Container>
              <Navbar.Brand><Link to="/home">Eycon</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Form onSubmit={this.handleSubmitSearchForm} inline className="navbar-search-form">
                  <FormControl onChange={this.handleSearch} size="sm" type="text" className="mr-sm-2" />
                  <FontAwesomeIcon icon={faSearch} className="search-icon navbar-search-form__icon" style={{ color: '#dcdcdc' }} />
                </Form>
                <Nav className="mr-5 w-100 justify-content-end create-publication">
                  <Button variant="light" className="create-publication__button" onClick={this.showPublicationModal}>
                    <h3 className="create-publication__text">Create</h3>
                    <FontAwesomeIcon icon={faPlus} className="create-publication__icon" />
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
                    title={user && (user[0].first_name + ' ' + user[0].last_name)}
                    id="basic-nav-dropdown"
                    className="navbar-dropdown"
                  >
                    {(pathname !== '/profile') &&
                      <NavDropdown.Item className="navbar-dropdown__item">
                        <Link to="/profile">Profile</Link>
                      </NavDropdown.Item>}
                    {(pathname !== '/home') &&
                      <NavDropdown.Item className="navbar-dropdown__item">
                        <Link to="/home">Home</Link>
                      </NavDropdown.Item>}
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
                        this.props.logout();
                        this.props.history.replace('/login');
                      }}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  <figure className="navbar-avatar">
                    <Image src={user && BASE_URL + user[0].avatar}
                      className="navbar-avatar__image" />
                  </figure>
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
}

export default (withRouter(Header));