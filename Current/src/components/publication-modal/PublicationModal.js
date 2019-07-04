import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, DropdownButton, Dropdown, Modal, Form, Image } from 'react-bootstrap';
import { faGlobe, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BASE_URL } from '../../app.constants';

import Attachment from '../generic/Attachment';

import './publicationModal.scss';

const INITIAL_STATE = {
  text: '',
  attachment: null,
  accessType: null,
  workType: null,
};

/**
 * Modal component which allows user to attach a few files along
 * with some text description and then publish this information.
 */
export default class PublicationModal extends Component {
  static propTypes = {
    /**
     * Object with `avatar` property which is a relative path to the user image
     * stored on the server side
     */
    user: PropTypes.shape({ avatar: PropTypes.string }),
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = INITIAL_STATE;

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      // make sure modal contents are cleared upon show
      this.setState(INITIAL_STATE);
    }
  }

  onPublicationTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpload = attachment => {
    this.setState({ attachment });
  };

  onRemove = () => {
    this.setState({ attachment: null });
  }

  onSubmit = () => {
    this.props.onSubmit(this.state);
  }

  renderPieceUploadField = type => {
    return (
      <Dropdown.Item as="div">
        {type}
      </Dropdown.Item>
    );
  }

  renderAccessTypeItem = accessType => (
    <React.Fragment>
      {accessType && accessType.type === 'Public' && <FontAwesomeIcon icon={faGlobe} className="access-type__icon" />}
      {accessType && accessType.type === 'Restricted' && <FontAwesomeIcon icon={faKey} className="access-type__icon" />}
      {accessType ? accessType.type : ''}
    </React.Fragment>
  )

  renderWorkTypeItem = workType => (
    <Dropdown.Item key={workType.id} onClick={() => this.setState({ workType })}>
      {workType.type}
    </Dropdown.Item>
  )

  render() {
    const { show, onHide, workTypes = [], accessTypes = [] } = this.props;
    return (
      <Modal show={show} onHide={onHide} centered size="lg" className="publication-modal" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <div className="header-title">Create a publication</div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Card className="publication-card-wrapper">
              <Card.Body className="publication-card__body">
                <div className="d-flex publication-card">
                  <figure className="navbar-avatar">
                    <Image src={this.props.user && BASE_URL + this.props.user.avatar}
                      className="navbar-avatar__image" />
                  </figure>
                  <div className="publication-card__control">
                    <Form.Control
                      placeholder="Share with the world your latest piece..."
                      className="publication-card__textarea"
                      as="textarea"
                      rows="3"
                      name="text"
                      onChange={this.onPublicationTextChange}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="publication-card__attachments">
              <Attachment
                attachment={this.state.attachment}
                onUpload={this.onUpload}
                onRemove={this.onRemove}
              />
              <DropdownButton
                title={this.state.workType && this.state.workType.type || 'Forms'}
                className="publication-card__forms"
              >
                {workTypes.map(this.renderWorkTypeItem)}
              </DropdownButton>
              <DropdownButton
                className="flex-grow-1 access-type"
                title={this.renderAccessTypeItem(this.state.accessType)}
              >
                {accessTypes.map(accessType => (
                  <Dropdown.Item key={accessType.id} onClick={() => this.setState({ accessType })}>
                    {this.renderAccessTypeItem(accessType)}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <div className="d-flex justify-content-end bbar">
              <Button
                onClick={this.onSubmit}
                className="publication-modal__button">Publish</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}