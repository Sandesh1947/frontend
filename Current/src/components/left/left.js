import React, { Component } from 'react';
import { faGraduationCap, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button,Image } from 'react-bootstrap'
import { BASE_URL } from '../../app.constants';
import isEqual from 'lodash/isEqual'
import './left.scss';

export default class Left extends Component {
  constructor(props){
    super(props)
    this.state = {avatar: '',avatarChanged:false}
    this.onFileUploadAvatar = this.onFileUploadAvatar.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.initAvatar = this.initAvatar.bind(this)
  }
  componentDidMount() {
    this.initAvatar();
  }
  componentDidUpdate(prevProps) {
    if(!isEqual(this.props.user,prevProps.user)) {
      this.initAvatar()
    }
  }
  initAvatar() {
    const user = this.props.user ? this.props.user[0] : null
    if(user)
    this.setState({avatar : BASE_URL + user.avatar,avatarChanged:false})
  }
  onFileUploadAvatar(e) {
    if (!e.target.files.length) {
        return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.loadImage(attachment)

}
loadImage(attachment) {
  const reader = new FileReader();
  reader.onload = e => {
      this.setState({ 'avatar': e.target.result,avatarChanged:true });
  };
  reader.readAsDataURL(attachment);
}
  render() {
    const user = this.props.user ? this.props.user[0] : null
    return (
      <React.Fragment>
        {user && <div className='left'>
          {this.props.from === 'profile' ?
            <React.Fragment>
              <div className='pic-container'>
                <label htmlFor='profile-pic'>
                  <Image src={this.state.avatar} className='left__avatar' />
                </label>
                <input
                  className="d-none"
                  type="file"
                  id='profile-pic'
                  name='profile-pic'
                  onChange={this.onFileUploadAvatar}
                />
              </div>
              {this.state.avatarChanged && <div className='d-flex'>
              <Button size="sm" className='mr-3' onClick={() => this.props.editProfile({avatar :this.state.avatar})} variant="outline-success">Save</Button>
              <Button size="sm" onClick={() => { this.initAvatar() }} variant="outline-danger">Cancel</Button>
                </div>}
            </React.Fragment> : <Image src={this.state.avatar} className='left__avatar' />}
          <h3
            className='left__username'>{user && (user.first_name + ' ' + user.last_name)}</h3>
          <p className='left__description'>{user && user.bio}</p>
          <div className='left-meta'>
            <figure className='left-meta__icon'>
              <FontAwesomeIcon icon={faGraduationCap} className='left-meta__fa' />
            </figure>
            {user && user.school}
          </div>
          <div className='left-meta'>
            <figure className='left-meta__icon'>
              <FontAwesomeIcon icon={faMapMarkerAlt} className='left-meta__fa' />
            </figure>
            {user && user.location}
          </div>

          <section className='people-wrapper'>
            <div className='people'>
              {this.props.followers && (
                <div className='people__heading d-flex flex-row justify-content-between align-items-baseline'>
                  <h6 className='people__title'>Audience</h6>
                  <a href='#' className='text-info people__all'>
                    <h6>All</h6>
                  </a>
                </div>
              )}
              {this.props.followers && (
                <div className='people-avatars'>
                  {this.props.followers.map((value, index) => {
                    return (
                      <figure className='people-avatars__figure' key={index}>
                        <Image className='people-avatars__image' src={BASE_URL + value.avatar} />
                      </figure>
                    )
                  })}
                </div>
              )}
            </div>

            <div className='people'>
              {this.props.partners && (
                <div className='people__heading d-flex flex-row justify-content-between align-items-baseline'>
                  <h6 className='people__title'>Partners</h6>
                  <a href='#' className='text-info people__all'>
                    <h6>All</h6>
                  </a>
                </div>
              )}
              {this.props.partners && (
                <div className='people-avatars'>
                  {this.props.partners.map((value, index) => {
                    return (
                      <figure className='people-avatars__figure' key={index}>
                        <Image className='people-avatars__image' src={BASE_URL + value.avatar} />
                      </figure>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        </div>}
      </React.Fragment>
    )
  }
}
