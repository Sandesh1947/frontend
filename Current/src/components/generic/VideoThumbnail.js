import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BigPlayButton, LoadingSpinner, Player } from 'video-react';
import { Modal } from 'react-bootstrap';

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
    playInOverlay: false,
  }

  componentWillMount() {
    if (this.props.file) {
      this.setSrc();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.file && this.props.file && this.props.file !== prevProps.file) {
      this.setSrc();
    }
  }

  setSrc() {
    this.setState({ src: URL.createObjectURL(this.props.file) });
  }

  get src() {
    return this.props.src || this.state.src;
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

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (Number.isFinite(video.duration)) {
        video.currentTime = this.props.captureTime;
      } else {
        // failed to parse this video, show close icon
        this.setState({ ready: true });
      }
    });
  }

  playInOverlay = () => {
    if (this.state.ready) {
      this.setState({ playInOverlay: true });
    }
  }

  closeOverlay = () => {
    this.setState({ playInOverlay: false });
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    } else {
      this.playInOverlay();
    }
  }

  get removeIcon() {
    if (!this.state.ready || !this.props.onRemove) {
      return null;
    }
    return <FontAwesomeIcon icon={faTimes} className="remove-icon" onClick={this.props.onRemove} />;
  }

  render() {
    return (
      <div className={`video-thumbnail ${this.props.className || ''}`}>
        <video ref={this.videoRef} src={this.src} type="video/mp4" />
        <canvas ref={this.canvasRef} onClick={this.onClick} />
        <FontAwesomeIcon icon={faFilm} size="4x" className="fallback" onClick={this.onClick} />
        {this.removeIcon}
        <Modal
          show={this.state.playInOverlay}
          onHide={this.closeOverlay}
          className="play-video-modal"
          centered
        >
          <Modal.Header closeButton>
            <div>Video Player</div>
          </Modal.Header>
          <Modal.Body>
            <Player autoPlay={true}>
              <source src={this.src} />
              <BigPlayButton position="center" />
              <LoadingSpinner />
            </Player>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
