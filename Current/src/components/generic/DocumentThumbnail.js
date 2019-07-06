import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DocumentThumbnail.scss';

/**
 * This component renderers thumbnail for document files (with remove icon)
 */
export default class DocumentThumbnail extends Component {
  static propTypes = {
    file: PropTypes.object,
    onRemove: PropTypes.func,
  }

  get removeIcon() {
    return this.props.onRemove
      ? <FontAwesomeIcon icon={faTimes} className="remove-icon" onClick={this.props.onRemove} />
      : null;
  }

  render() {
    return (
      <div className="document-thumbnail">
        <FontAwesomeIcon icon={faFile} className="thumbnail" />
        {this.removeIcon}
      </div>
    );
  }
}
