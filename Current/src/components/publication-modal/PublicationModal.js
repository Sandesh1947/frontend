import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import Publication from '../publication/Publication';

import './publicationModal.scss';

/**
 * Modal component which allows user to attach a few files along
 * with some text description and then publish this information.
 */
export default class PublicationModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      // TODO: make sure modal contents are cleared upon show (probably using react ref and adding some reset method???)
    }
  }

  render() {
    const { show, onHide } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        centered size="lg"
        className="publication-modal"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <div className="header-title">Create a publication</div>
        </Modal.Header>
        <Modal.Body>
          <Publication publicationType="work" />
        </Modal.Body>
      </Modal>
    );
  }
}