import React, { Component } from 'react';
import { faGraduationCap, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'react-bootstrap/Image';
import { BASE_URL } from '../../app.constants';
import './left.scss';

export default class Left extends Component {
  render() {
    const user = this.props.user[0]
    return (
      <div className='left'>
        <Image src={user && BASE_URL + user.avatar} className='left__avatar' />

        <h3
          className='left__username'>{user && (user.first_name + ' ' + user.last_name)}</h3>
        <p className='left__description'>{user && user.profession}</p>
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
      </div>
    )
  }
}
