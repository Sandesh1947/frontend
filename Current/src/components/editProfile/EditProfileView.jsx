import React from 'react'
import './styles.scss'
import { Row,Col,Button,Image } from 'react-bootstrap'
class EditProfileView extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={9}>
                    <h1 className='edit-profile-header'>Edit Profile</h1>
                    <p className='sub-heading-edit-profile'>People in Eycon will get to know you with following information</p>
                    </Col>
                    <Col md={3}> 
                    <Row>
                        <Col md={5}><Button   variant="outline-danger">Cancel</Button></Col>
                        <Col md={5}><Button  variant="outline-success">Save</Button></Col>
                    </Row>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={2}>
                    <Image src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" style={{borderRadius: '45px'}}/>
                    </Col>
                    <Col md={4}>
                    <Button className='mt-3 button-background ' variant="danger">Upload new avatar</Button>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>First name</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="First name" value="Mark" />
                    </Col>
                    <Col md={6}>
                    <label className='sub-heading-edit-profile'>Last name</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="Last name" value="Anthony" />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Sex</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Sex" value="Male" />
                    </Col>
                    <Col md={6}>
                    <label className='sub-heading-edit-profile'>Date of birth</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="Date of birth" value="13-12-1945" />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>School</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="School" value="STPS" />
                    </Col>
                    <Col md={6}>
                    <label className='sub-heading-edit-profile'>Profession</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="Profession" value="SE" />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Email</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Email" value="pk@pk.com" />
                    </Col>
                    <Col md={6}>
                    <label className='sub-heading-edit-profile'>Phone</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="Phone" value="999999999" />
                    </Col>
                </Row>

                <Row className='mt-4'>
                <Col md={12}>
                        <label className='sub-heading-edit-profile'>Bio</label>
                        <textarea type="text" className="form-control" id="validationCustom01" placeholder="Bio" value="hi there" />
                    </Col>

                </Row>

                <Row className='mt-4'>
                <Col md={9}>
                <label className='sub-heading-edit-profile'>Cover Pic</label>
                    <Image width='400px' src='/img1.png' />
                </Col>
                <Col>
                <Button className='button-background '>Change Cover Pic</Button>
                </Col>
                </Row>
            </React.Fragment>
        )
    }
}
export default EditProfileView