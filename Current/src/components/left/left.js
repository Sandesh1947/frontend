import React, { Component } from 'react';
import { faGraduationCap, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button,Image } from 'react-bootstrap'
import { BASE_URL } from '../../app.constants';
import isEqual from 'lodash/isEqual'
import ProfilePic from './profilePic'
import './left.scss';

export default class Left extends Component {
  constructor(props){
    super(props)
    this.state = {avatar: '',avatarChanged:false,enlargeImage:false}
    this.onFileUploadAvatar = this.onFileUploadAvatar.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.initAvatar = this.initAvatar.bind(this)
    this.editProfile = this.editProfile.bind(this)
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
editProfile() {
  this.setState({avatarChanged:false})
  this.props.editProfile({ avatar: this.state.avatar })
}
  render() {
    const user = this.props.user ? this.props.user[0] : null
    return (
      <React.Fragment>
        {user && <div className='left'>
          {this.props.from === 'profile' ?
            <React.Fragment>
              <div className={this.state.avatarChanged ? 'pic-container overlay-container':'pic-container'}>
              {this.state.avatarChanged && <div className='d-flex mb-2'>
                <Button size="sm" className='mr-3' onClick={this.editProfile} variant="outline-success">Save</Button>
                <Button size="sm" onClick={() => { this.initAvatar() }} variant="outline-danger">Cancel</Button>
              </div>}
                <label htmlFor='profile-pic'>
                  <Image src={this.state.avatar} className={this.state.avatarChanged ? 'left__avatar profile-pic-changed-opacity':'left__avatar'}  />
                </label>
                <input
                  className="d-none"
                  type="file"
                  id='profile-pic'
                  name='profile-pic'
                  onChange={this.onFileUploadAvatar}
                />
              </div>
            </React.Fragment> : <Image onClick={()=>{this.setState({enlargeImage:true})}} src={this.state.avatar} className='left__avatarhome' />}
            {this.state.enlargeImage && <ProfilePic imgsrc={this.state.avatar} close={()=>this.setState({enlargeImage:false})}/> }
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
