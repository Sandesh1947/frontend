import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VideoThumbnail from './VideoThumbnail';
import ImageThumbnail from './ImageThumbnail';
import DocumentThumbnail from './DocumentThumbnail';

import './Attachment.scss';
import { faImage } from '@fortawesome/free-regular-svg-icons';

let fileInputId = 0;

/**
 * This component is used to upload documents and files.
 */
class Attachment extends Component {
  static propTypes = {
    /**
     * This callback function is executed when file is attached.
     * The only argument is attached file
     */
    onUpload: PropTypes.func.isRequired,

    /**
     * Optional function which is used to remove already attached file/document.
     * When this function is specified - an icon to remove attachment will be renderd
     * and it will fire this callback on click
     */
    onRemove: PropTypes.func,

    /**
     * Attached file
     */
    attachment: PropTypes.object,
  }

  static isImage = file => file && (file.type === 'image/jpeg' || file.type === 'image/png');
  static isVideo = file => file && file.type === 'video/mp4';
  static isDocument = file => file && !Attachment.isVideo(file) && !Attachment.isImage(file);

  constructor() {
    super(...arguments);
    fileInputId++;
  }

  onFileUpload = e => {
    if (!e.target.files.length) {
      return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.props.onUpload(attachment);
  }

  get uploadIcon() {
    return this.props.attachment
      ? null
      : (
        <div key={fileInputId} className="btn attachment__button">
          <label htmlFor={fileInputId} className="m-0 p-0 attachment__label">
            <FontAwesomeIcon icon={faImage} size="2x" className="cursor-pointer attachment__icon" />
          </label>
          <input
            className="d-none"
            type="file"
            id={fileInputId}
            name={fileInputId}
            onChange={this.onFileUpload}
          />
        </div>
      );
  }

  get videoThumbnail() {
    return Attachment.isVideo(this.props.attachment)
      ? <VideoThumbnail file={this.props.attachment} onRemove={this.props.onRemove} />
      : null;
  }

  get imageThumbnail() {
    return Attachment.isImage(this.props.attachment)
      ? <ImageThumbnail file={this.props.attachment} onRemove={this.props.onRemove} />
      : null;
  }

  get documentThumbnail() {
    return Attachment.isDocument(this.props.attachment)
      ? <DocumentThumbnail file={this.props.attachment} onRemove={this.props.onRemove} />
      : null;
  }

  render() {
    const { onUpload, onRemove, attachment, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <div className="attachment">
          {this.videoThumbnail}
          {this.imageThumbnail}
          {this.documentThumbnail}
          {this.uploadIcon}
        </div>
      </div>
    );
  }
}

export default Attachment;