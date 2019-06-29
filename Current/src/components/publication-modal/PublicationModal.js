import React, { Component } from 'react';
import { Button, Card, DropdownButton, Dropdown, Modal, Form, Image } from 'react-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './publicationModal.scss';

import { BASE_URL } from '../../app.constants';
import Attachment from '../attachment/attachment';

export default class PublicationModal extends Component {
  state = {
    showUploadPiece: false,
    pieceFile: null,
    pieceType: null,
  };

  onUploadPiece = (e, pieceType) => {
    if (!e.target.files.length) {
      return;
    }

    const file = Array.from(e.target.files)[0];
    this.setState({ pieceFile: file, pieceType });

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = e => {
        this.setState({ pieceImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  onUpload = attachment => {
    console.log(attachment);
  };

  removePiece = () => {
    const { pieceType } = this.state;
    if (pieceType) {
      // TODO:
      // document.querySelector(`.publication-modal input#piece-${pieceType}`).value = '';
    }

    this.setState({ pieceFile: null, pieceImage: null, pieceType: null });
  }

  renderPieceUploadField = type => {
    return (
      <Dropdown.Item as="div">
        {type}
        <input
          className="file-picker"
          title=""
          type="file"
          id={`piece-${type}`}
          onChange={e => this.onUploadPiece(e, type)}
        />
      </Dropdown.Item>
    );
  }

  renderPiece() {
    const { pieceFile, pieceType, pieceImage } = this.state;
    return (
      <React.Fragment>
        <span className={`add-piece__label${pieceFile ? ' d-none' : ''}`}>Add Piece</span>
        <DropdownButton title="Forms" className={pieceFile ? ' d-none' : ''}>
          {this.renderPieceUploadField('Essay')}
          {this.renderPieceUploadField('Poem')}
          {this.renderPieceUploadField('Lyrics')}
        </DropdownButton>
        <div className={`preview ${pieceFile ? '' : 'd-none'}`}>
          {pieceImage && <img src={pieceImage} />}
          {pieceImage && <FontAwesomeIcon icon={faTimes} className="preview__removeIcon" onClick={this.removePiece} />
          }
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { show, onShow, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} onShow={onShow} centered size="lg" className="publication-modal" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <div className="header-title">
            Create a publication
          </div>
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
                      value={this.state.todo1}
                      onChange={() => { console.error('TODO!!!'); }}
                    />
                  </div>
                </div>
                <Attachment types={['image', 'geo']} onUpload={this.onUpload} className="publication-card__attachments" />
              </Card.Body>
            </Card>
            <Card className="add-piece justify-content-between">
              {this.renderPiece()}
              <DropdownButton className="flex-grow-1 visibility" title="Public">
                <Dropdown.Item>Public</Dropdown.Item>
              </DropdownButton>
            </Card>
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