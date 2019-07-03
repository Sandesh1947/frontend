import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ImageThumbnail.scss';

/**
 * This component renderers thumbnail for the image files
 */
export default class ImageThumbnail extends Component {
  static propTypes = {
    file: PropTypes.object,
    onRemove: PropTypes.func,
  }

  state = {
    src: null,
  }

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProp) {
    if (this.props.file && this.props.file !== prevProp.file) {
      this.loadImage();
    }
  }

  loadImage() {
    if (!this.props.file) { return; }

    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ src: e.target.result });
    };
    reader.readAsDataURL(this.props.file);
  }

  get removeIcon() {
    if (!this.state.src || !this.props.onRemove) {
      return null;
    }
    return <FontAwesomeIcon icon={faTimes} className="remove-icon" onClick={this.props.onRemove} />;
  }

  render() {
    return (
      <div className="image-thumbnail">
        <img src={this.state.src} alt='thumnail' />
        <FontAwesomeIcon icon={faImage} size="4x" className="fallback" />
        {this.removeIcon}
      </div>
    );
  }
}
