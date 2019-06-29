import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faFilm, faImage, faMapMarkerAlt, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './attachment.scss';

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
    types: PropTypes.oneOfType([
      PropTypes.string, PropTypes.arrayOf(PropTypes.oneOf(['image', 'video', 'geo'])),
    ]).isRequired,
  }

  state = {
    attachment: null,
    attachmentType: null,
  }

  renderField = type => {
    const { attachmentType } = this.state;
    if (attachmentType !== null && attachmentType !== type) {
      return null;
    }

    return (
      <div key={type} className="btn attachment__button">
        <label htmlFor={type} className="m-0 p-0 attachment__label">
          <FontAwesomeIcon icon={IMGAGES[type]} size="2x" className="cursor-pointer attachment__icon" />
        </label>
        <input
          className="d-none"
          type="file"
          id={type}
          name={type}
          onChange={this.onFileUpload}
          accept={FORMATS[type]}
        />
      </div>
    );
  }

  onFileUpload = e => {
    if (!e.target.files.length) {
      return;
    }

    const attachment = Array.from(e.target.files)[0];
    let attachmentInfo;
    if (attachment.type === 'image/jpeg' || attachment.type === 'image/png') {
      attachmentInfo = { attachment, attachmentType: 'image' };
    } else if (attachment.type === 'video/mp4') {
      attachmentInfo = { attachment, attachmentType: 'video' };
    } else {
      attachmentInfo = { attachment: null, attachmentType: null };
    }
    this.setState(attachmentInfo);

    this.props.onUpload(attachmentInfo);
  }

  render() {
    const { types, onUpload, ...otherProps } = this.props;
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