import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, DropdownButton, Dropdown, Modal, Form, Image } from 'react-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BASE_URL } from '../../app.constants';

import Attachment from '../generic/Attachment';
import VideoThumbnail from '../generic/VideoThumbnail';
import ImageThumbnail from '../generic/ImageThumbnail';

import './publicationModal.scss';

const INITIAL_STATE = {
  text: '',
  pieceFile: null,
  pieceType: null,
  attachment: null,
  attachmentType: null,
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

  onSubmit = () => {
    this.props.onSubmit(this.state);
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
    if (Attachment.isImage(pieceFile)) {
      return <ImageThumbnail file={pieceFile} onRemove={this.removePiece} />;
    }
    if (Attachment.isVideo(pieceFile)) {
      return <VideoThumbnail file={pieceFile} onRemove={this.removePiece} />;
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
    const { show, onHide } = this.props;
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