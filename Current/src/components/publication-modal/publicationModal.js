import React, { Component } from 'react';
import { Button, Card, Modal, Form, Image } from 'react-bootstrap';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './publicationModal.scss';

import { BASE_URL } from '../../app.constants';
import Attachment from '../attachment/attachment';

export default class PublicationModal extends Component {
  state = {

  }

  render() {
    const { show, onShow, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} onShow={onShow} aria-labelledby="contained-modal-title-vcenter" centered className="publication-modal">
        <Modal.Header closeButton>
          <div className="header-title">
            Create a publication
          </div>
        </Modal.Header>
        <Modal.Body>
          <Card className='publication-card-wrapper'>
            <Card.Body style={{ padding: '1rem' }} className='publication-card-body'>
              <Form>
                <div className='d-flex publication-card'>
                  <figure className='navbar-avatar'>
                    <Image src={this.props.user && BASE_URL + this.props.user.avatar}
                      className='navbar-avatar__image' />
                  </figure>
                  <div className='publication-card__control'>
                    <Form.Control style={{ resize: 'none' }} placeholder='Share with the world your latest piece...'
                      as='textarea' rows='3' value={this.state.todo1} onChange={() => { console.error('TODO!!!') }} className='publication-card__textarea' />
                  </div>
                </div>
                <Attachment types={['image']} onUpload={this.onUpload} className="publication-card__attachments" />
                <figure className="publication-card__map-marker">
                  <FontAwesomeIcon icon={faMapMarkerAlt} size='2x' />
                </figure>
              </Form>

            </Card.Body>
          </Card>
          <div className='d-flex justify-content-end bbar'>
            <Button
              onClick={this.onSubmit}
              className='publication-modal__button'>Publish</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}