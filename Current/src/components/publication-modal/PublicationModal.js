import React, { Component } from 'react';
import { Button, Card, DropdownButton, Dropdown, Modal, Form, Image } from 'react-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './publicationModal.scss';

import { BASE_URL } from '../../app.constants';

import Attachment from '../generic/Attachment';
import VideoThumbnail from '../generic/VideoThumbnail';
import ImageThumbnail from '../generic/ImageThumbnail';

export default class PublicationModal extends Component {
  state = {
    showUploadPiece: false,
    pieceFile: null,
    pieceType: null,
    attachment: null,
    attachmentType: null,
  };

  onUploadPiece = (e, pieceType) => {
    if (!e.target.files.length) {
      return;
    }

    const pieceFile = Array.from(e.target.files)[0];
    this.setState({ pieceFile, pieceType });
  };

  onUpload = ({ attachment, attachmentType }) => {
    this.setState({ attachment, attachmentType });
  };
  
  onRemove = () => {
    this.setState({
      attachment: null,
      attachmentType: null,
    });
  }

  removePiece = () => {
    const { pieceType } = this.state;
    if (pieceType) {
      // rest file picker so that the same file can be picked again
      // (o/w change event won't fire for the same file)
      document.querySelector(`.publication-modal input#piece-${pieceType}`).value = '';
    }

    this.setState({ pieceFile: null, pieceType: null });
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

  get thumbnail() {
    const { pieceFile } = this.state;
    if (pieceFile) {
      if (pieceFile.type === 'video/mp4') {
        return <VideoThumbnail file={pieceFile} onRemove={this.removePiece} />;
      }
      if (pieceFile.type === 'image/jpeg' || pieceFile.type === 'image/png') {
        return <ImageThumbnail file={pieceFile} onRemove={this.removePiece} />;
      }
    }
    return <FontAwesomeIcon icon={faTimes} className="preview__removeIcon" onClick={this.removePiece} />;
  }

  // unfortunately can't reuse Attachment field here for now
  renderPiece() {
    const { pieceFile } = this.state;
    return (
      <React.Fragment>
        <span className={`add-piece__label${pieceFile ? ' d-none' : ''}`}>Add Piece</span>
        <DropdownButton title="Forms" className={pieceFile ? ' d-none' : ''}>
          {this.renderPieceUploadField('Essay')}
          {this.renderPieceUploadField('Poem')}
          {this.renderPieceUploadField('Lyrics')}
        </DropdownButton>
        <div className={`preview ${pieceFile ? '' : 'd-none'}`}>
          {this.thumbnail}
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
                <Attachment
                  types={['image', 'geo']}
                  attachment={this.state.attachment}
                  attachmentType={this.state.attachmentType}
                  onUpload={this.onUpload}
                  onRemove={this.onRemove}
                  className="publication-card__attachments"
                />
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