import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './VideoThumbnail.scss';

/**
 * This component renderers thumbnail/image for the video files
 */
export default class VideoThumbnail extends Component {
  static propTypes = {
    src: PropTypes.string,
    file: props => {
      if (props.file && props.src) {
        return new Error('Either `src` or `file` should be defined, but not both');
      }
      if (!props.file && !props.src) {
        return new Error('Either `src` or `file` should be defined');
      }
      if (!props.src && typeof props.file !== 'object') {
        return new Error('`file` property value sould be of `object` type');
      }
    },
    onRemove: PropTypes.func,
    captureTime: PropTypes.number.isRequired,
  }

  static defaultProps = {
    captureTime: 0,
  }

  state = {
    ready: false,
  }

  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const video = this.videoRef.current;

    video.addEventListener('timeupdate', () => {
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      this.setState({ ready: true });
    });

    video.addEventListener('loadedmetadata', (...args) => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = this.props.captureTime;
    });
  }

  get removeIcon() {
    if (!this.state.ready || !this.props.onRemove) {
      return null;
    }
    return <FontAwesomeIcon icon={faTimes} className="remove-icon" onClick={this.props.onRemove} />;
  }

  get src() {
    return this.props.src || URL.createObjectURL(this.props.file);
  }

  render() {
    return (
      <div className="video-thumbnail">
        <video ref={this.videoRef} src={this.src} type="video/mp4" />
        <canvas ref={this.canvasRef} />
        <FontAwesomeIcon icon={faFilm} size="4x" className="fallback" />
        {this.removeIcon}
      </div>
    );
  }
}
