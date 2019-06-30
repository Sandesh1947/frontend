import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faFilm, faImage, faMapMarkerAlt, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VideoThumbnail from './VideoThumbnail';
import ImageThumbnail from './ImageThumbnail';

import './Attachment.scss';

let TEMP_HACK = 1;

/**
 * This component is used to upload documents and files.
 */
class Attachment extends Component {
  static propTypes = {
    /**
     * This callback function is executed when file is attached.
     * The only argument is object with the following keys:
     * 
     * * `attachment` - attached file
     * * `attachmentType` - attachment type {String}
     */
    onUpload: PropTypes.func.isRequired,

    /**
     * file and document types to accept.
     * If there's only one type - provide a string, e.g. `image`
     * o/w use array, e.g. [`image`, `video`]
     */
    types: PropTypes.oneOfType([
      PropTypes.string, PropTypes.arrayOf(PropTypes.oneOf(['image', 'video', 'geo'])),
    ]).isRequired,

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

    /**
     * Attached file type
     */
    attachmentType: PropTypes.oneOf(['image', 'video', 'geo']),
  }

  static isImage = file => file && (file.type === 'image/jpeg' || file.type === 'image/png');
  static isVideo = file => file && file.type === 'video/mp4';

  componentDidMount() {
    TEMP_HACK++;
  }

  onFileUpload = e => {
    if (!e.target.files.length) {
      return;
    }

    const attachment = Array.from(e.target.files)[0];
    let attachmentInfo;
    if (Attachment.isImage(attachment)) {
      attachmentInfo = { attachment, attachmentType: 'image' };
    } else if (Attachment.isVideo(attachment)) {
      attachmentInfo = { attachment, attachmentType: 'video' };
    } else {
      attachmentInfo = { attachment: null, attachmentType: null };
    }
    this.props.onUpload(attachmentInfo);
  }

  renderField = type => {
    const { attachmentType, attachment } = this.props;
    if (attachmentType != null && attachmentType !== type) {
      return null;
    }

    if (attachment) {
      if (attachmentType === 'video') {
        return <VideoThumbnail key={type} file={attachment} onRemove={this.props.onRemove} />;
      }
      if (attachmentType === 'image') {
        return <ImageThumbnail key={type} file={attachment} onRemove={this.props.onRemove} />;
      }
    }

    return (
      <div key={type + TEMP_HACK} className="btn attachment__button">
        <label htmlFor={type + TEMP_HACK} className="m-0 p-0 attachment__label">
          <FontAwesomeIcon icon={IMGAGES[type]} size="2x" className="cursor-pointer attachment__icon" />
        </label>
        <input
          className="d-none"
          type="file"
          id={type + TEMP_HACK}
          name={type + TEMP_HACK}
          onChange={this.onFileUpload}
          accept={FORMATS[type]}
        />
      </div>
    );
  }

  render() {
    const { types, onUpload, onRemove, attachment, attachmentType, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <div className="attachment">
          {[].concat(types).map(this.renderField)}
        </div>
      </div>
    );
  }
}

const FORMATS = {
  image: 'image/x-png,image/jpeg',
  video: 'video/mp4',
  any: '*',
};

const IMGAGES = {
  image: faImage,
  video: faFilm,
  geo: faMapMarkerAlt,
  any: faFile,
};

export default Attachment;