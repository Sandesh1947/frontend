import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, DropdownButton, Dropdown, Form, Image } from 'react-bootstrap';
import { faGlobe, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BASE_URL } from '../../app.constants';
import { postPublication } from '../../actions/userPublicationAction';
import { getWorkTypes } from '../../actions/workTypeAction';
import { getAccessTypes } from '../../actions/accessTypeAction';

import Attachment from '../generic/Attachment';

import './Publication.scss';

const INITIAL_STATE = {
  text: '',
  attachment: null,
  accessType: null,
  workType: null,
  posting: false,
};

class Publication extends Component {
  static propTypes = {
    publicationType: PropTypes.oneOf(['update', 'work']).isRequired,
    workTypes: PropTypes.array,
    accessTypes: PropTypes.array,
    onSubmit: PropTypes.func,
  }

  state = INITIAL_STATE

  static getDerivedStateFromProps(props, state) {
    const derived = {};
    if (props.accessTypes && props.accessTypes.length && !state.accessType) {
      derived.accessType = props.accessTypes.find(t => t.accesstype === 'Public');
    }
    return derived;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posting !== this.props.posting) {
      if (this.props.posting) {
        this.setState({ posting: true });
      } else {
        if (this.props.onSubmit) {
          this.props.onSubmit();
        } else {
          this.setState(INITIAL_STATE);
        }
      }
    }
  }

  isValid() {
    const { text, attachment, accessType, workType } = this.state;
    // either text or attachment should be provided
    if (!text && !attachment) {
      return false;
    }
    if (this.props.publicationType === 'work') {
      // when publication is opened via "Create+" user has to select access type and work type.
      return accessType && workType;
    }
    return this.props.publicationType === 'update';
  }

  componentDidMount() {
    if (this.props.workTypes.length === 0) {
      this.props.getWorkTypes();
    }
    if (this.props.accessTypes.length === 0) {
      this.props.getAccessTypes();
    }
  }

  onPublicationTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpload = attachment => {
    this.setState({ attachment });
  }

  onRemove = () => {
    this.setState({ attachment: null });
  }

  onSubmit = () => {
    this.props.postPublication({
      ...this.state,
      publicationType: this.props.publicationType,
    });
  }

  renderAccessTypeItem = accessType => (
    <React.Fragment>
      {accessType && accessType.accesstype === 'Public' && <FontAwesomeIcon icon={faGlobe} className="access-type__icon" />}
      {accessType && accessType.accesstype === 'Restricted' && <FontAwesomeIcon icon={faKey} className="access-type__icon" />}
      {accessType ? accessType.accesstype : ''}
    </React.Fragment>
  )

  renderWorkTypeItem = workType => (
    <Dropdown.Item key={workType.id} onClick={() => this.setState({ workType })}>
      {workType.worktype}
    </Dropdown.Item>
  )

  get workTypeDropdown() {
    return this.props.publicationType === 'work' && (
      <DropdownButton
        title={this.state.workType ? this.state.workType.worktype : 'Forms'}
        className="publication-form__work-type"
      >
        {this.props.workTypes.map(this.renderWorkTypeItem)}
      </DropdownButton>
    );
  }

  get accessTypeDropdown() {
    return this.props.publicationType === 'work' && (
      <DropdownButton
        className="flex-grow-1 access-type"
        title={this.renderAccessTypeItem(this.state.accessType)}
      >
        {this.props.accessTypes.map(accessType => (
          <Dropdown.Item key={accessType.id} onClick={() => this.setState({ accessType })}>
            {this.renderAccessTypeItem(accessType)}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }

  get publishWorkButton() {
    return this.props.publicationType === 'work' && (
      <div className="d-flex justify-content-end bbar">
        <Button
          onClick={this.onSubmit}
          disabled={!this.isValid()}
          className="publish-button__work">Publish</Button>
      </div>
    );
  }

  get publishUpdateButton() {
    return this.props.publicationType === 'update' && (
      <div className="d-flex flex-grow-1 justify-content-end">
        <Button
          disabled={!this.isValid()}
          onClick={this.onSubmit}
          className="publish-button__update">Publish</Button>
      </div>
    );
  }

  render() {
    const { className } = this.props;
    return (
      <Form className={`publication-form ${className || ''}`}>
        <Card>
          <Card.Body className="publication-form__body">
            <div className="d-flex">
              <figure className="navbar-avatar">
                <Image src={this.props.user && BASE_URL + this.props.user[0].avatar}
                  className="navbar-avatar__image" />
              </figure>
              <div className="publication-form__control">
                <Form.Control
                  placeholder="Share with the world your latest piece..."
                  className="publication-form__textarea"
                  as="textarea"
                  rows="3"
                  name="text"
                  value={this.state.text}
                  onChange={this.onPublicationTextChange}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="publication-form__attachments">
          <Attachment
            attachment={this.state.attachment}
            onUpload={this.onUpload}
            onRemove={this.onRemove}
          />
          {this.workTypeDropdown}
          {this.accessTypeDropdown}
          {this.publishUpdateButton}
        </div>
        {this.publishWorkButton}
      </Form>
    );
  }
}

const mapStateToProps = ({ userInfo, workTypes, accessTypes, userPublications }) => ({
  user: userInfo.user,
  workTypes: workTypes.workTypes || [],
  accessTypes: accessTypes.accessTypes || [],
  posting: userPublications.posting,
});

const mapDispatchersToProps = {
  postPublication,
  getWorkTypes,
  getAccessTypes,
};

export default connect(mapStateToProps, mapDispatchersToProps)(Publication);