import React from 'react'
import { Modal, Image } from 'react-bootstrap';
export default class ProfilePic extends React.Component {
    render() {
        const { imgsrc } = this.props
        return (
            <Modal centered show={true} onHide={this.props.close} >
             <Image src={imgsrc} />
            </Modal>
        )
    }
}