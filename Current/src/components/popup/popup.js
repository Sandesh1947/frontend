import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import ReactTimeAgo from 'react-time-ago';
import { BigPlayButton, LoadingSpinner, Player } from 'video-react';
import { BASE_URL } from '../../app.constants';
import "./popup.scss";

export default class Popup extends Component {

    onModalShow = () => {
        var prev = document.getElementsByClassName("carousel-control-prev")[0];
        var next = document.getElementsByClassName("carousel-control-next")[0];
        var modal = document.getElementsByClassName("modal")[0];
        modal.prepend(prev);
        modal.append(next);
    }

    render() {
        const { user, userPublications, show, onHide } = this.props;

        return (
            <Modal show={show} onShow={this.onModalShow} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered >
                <div className="carousel-control-prev" role="button" onClick={this.props.onPrevClick}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </div>
                <div className="carousel-control-next" role="button" onClick={this.props.onNextClick}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </div>
                <Modal.Header closeButton>
                    <div className="d-flex flex-row justify-content-center w-100">
                        <div className="d-flex flex-column align-items-center">
                            <Image className="header-avatar" src={userPublications && BASE_URL + userPublications.avatar} />
                            <div className="header-title">{userPublications && (userPublications.first_name + ' ' + userPublications.last_name)}</div>
                            {userPublications && !isNaN(Date.parse(userPublications.created_at)) &&
                                <span className="header-ago"><ReactTimeAgo date={new Date(userPublications.created_at)} /> - Public</span>
                            }
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {userPublications && userPublications.publication_text &&
                        <div>{userPublications.publication_text}</div>
                    }

                    {userPublications && userPublications.publication_img === '1' &&
                        <Image className="body-post-image" src={BASE_URL + userPublications.post} />
                    }

                    {userPublications && userPublications.publication_vid === '1' && (
                        <Player
                            playsInline
                            src={BASE_URL + userPublications.post}
                        >
                            <BigPlayButton position="center" />
                            <LoadingSpinner />
                        </Player>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-1">
                        <span className="like"><FontAwesomeIcon icon={["far", "heart"]} color="#bebebe" /> 3260</span>
                        <span className="like" style={{ color: "#bebebe", fontWeight: "400" }}>|</span>
                        <span className="d-flex align-items-center">
                            <span className="like"><FontAwesomeIcon icon={["fas", "share"]} color="#bebebe" /> 3260</span>
                            <span className="like d-flex align-items-center">&nbsp;Promoted by&nbsp;&nbsp;&nbsp;&nbsp;
                                <Image className="promoted-by-image" src={require("../../assets/avatar.png")} />
                                <Image className="promoted-by-image" src={require("../../assets/avatar.png")} />
                                <Image className="promoted-by-image" src={require("../../assets/avatar.png")} />
                                <Image className="promoted-by-image" src={require("../../assets/avatar.png")} />
                            </span>
                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 footer-buttons">
                        <Button variant="light">Like</Button>
                        <Button variant="light">Promote</Button>
                    </div>
                    <div className="d-flex w-100">
                        <Image className="footer-avatar" src={userPublications && BASE_URL + userPublications.avatar} />
                        <Form.Control type="text" placeholder="Add comment" />
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}
