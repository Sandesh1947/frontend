import React from 'react'
import './styles.scss'
import { Row, Col, Button, Image } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
class EditProfileView extends React.Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            sex: '',
            dob: '',
            school: '',
            profession: '',
            phone: '',
            email: '',
            location: '',
            bio: '',
            avatar: '',
            coverpic: '',
            fieldsChanged: {}
        }
        this.handleSave = this.handleSave.bind(this)
        this.initValues = this.initValues.bind(this)
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this)
        this.birthDate = null
        this.handleTextFieldChanges = this.handleTextFieldChanges.bind(this)
    }
    componentDidMount() {
        this.initValues()
    }
    initValues() {
        let userInfo = this.props.userInfo
        this.setState({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            sex: userInfo.sex,
            dob: userInfo.dob,
            school: userInfo.school,
            profession: userInfo.profession,
            phone: userInfo.phone,
            email: userInfo.email,
            location: userInfo.location,
            bio: userInfo.bio,
            avatar: userInfo.avatar,
            coverpic: userInfo.coverPic,
        })
    }
    handleSave() {
        console.log(this.state.fieldsChanged)
    }
    handleDateOfBirth(value) {
        this.birthDate = value
        let changedFields = this.state.fieldsChanged
        Object.assign(changedFields, { dob: moment(value).format("YYYY-MM-DD") })
        this.setState({ fieldsChanged: changedFields })
        this.setState({ dob: moment(value).format("YYYY-MM-DD") })
    }
    handleTextFieldChanges(field, value) {
        let changedFields = this.state.fieldsChanged
        switch (field) {
            case 'first_name': this.setState({ first_name: value });
                Object.assign(changedFields, { first_name: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'last_name': this.setState({ last_name: value });
                Object.assign(changedFields, { last_name: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'phone': this.setState({ phone: value });
                Object.assign(changedFields, { phone: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'profession': this.setState({ profession: value });
                Object.assign(changedFields, { profession: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'bio': this.setState({ bio: value });
                Object.assign(changedFields, { bio: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'school': this.setState({ school: value });
                Object.assign(changedFields, { school: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'email': this.setState({ email: value });
                Object.assign(changedFields, { email: value })
                this.setState({ fieldsChanged: changedFields });
                break;
            case 'location': this.setState({ location: value });
                Object.assign(changedFields, { location: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'sex': this.setState({ sex: value });
                Object.assign(changedFields, { sex: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            default: return
        }
    }
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
                            <Col md={5}><Button onClick={() => { this.initValues() }} variant="outline-danger">Cancel</Button></Col>
                            <Col md={5}><Button onClick={this.handleSave} variant="outline-success">Save</Button></Col>
                        </Row>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={2}>
                        <Image src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" style={{ borderRadius: '45px' }} />
                    </Col>
                    <Col md={4}>
                        <Button className='mt-3 button-background ' variant="danger">Upload new avatar</Button>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>First name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={(event) => this.handleTextFieldChanges('first_name', event.target.value)} value={this.state.first_name} />
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" onChange={(event) => this.handleTextFieldChanges('last_name', event.target.value)} value={this.state.last_name} />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Sex</label>
                        <select onChange={(event) => this.handleTextFieldChanges('sex', event.target.value)} className="form-control" value={this.state.sex}>
                            <option value='m'>Male</option>
                            <option value='f'>Female</option>
                            <option>Other</option>
                        </select>
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Date of birth</label>
                        <div className='form-control'>
                            <DatePicker
                                placeholderText='Date of birth'
                                selected={this.birthDate}
                                onChange={this.handleDateOfBirth}
                            />
                        </div>
                        {/* <input type="date" className="form-control" placeholder="Date of birth" onChange={(event)=>this.handleTextFieldChanges('dob',event.target.value)} value={this.state.dob} /> */}
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>School</label>
                        <input type="text" className="form-control" placeholder="School" onChange={(event) => this.handleTextFieldChanges('school', event.target.value)} value={this.state.school} />
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Profession</label>
                        <input type="text" className="form-control" placeholder="Profession" onChange={(event) => this.handleTextFieldChanges('profession', event.target.value)} value={this.state.profession} />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={4}>
                        <label className='sub-heading-edit-profile'>Email</label>
                        <input type="text" className="form-control" placeholder="Email" onChange={(event) => this.handleTextFieldChanges('email', event.target.value)} value={this.state.email} />
                    </Col>
                    <Col md={4}>
                        <label className='sub-heading-edit-profile'>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone" onChange={(event) => this.handleTextFieldChanges('phone', event.target.value)} value={this.state.phone} />
                    </Col>
                    <Col md={4}>
                        <label className='sub-heading-edit-profile'>Location</label>
                        <input type="text" className="form-control" placeholder="Phone" onChange={(event) => this.handleTextFieldChanges('location', event.target.value)} value={this.state.location} />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={12}>
                        <label className='sub-heading-edit-profile'>Bio</label>
                        <textarea type="text" className="form-control" placeholder="Bio" onChange={(event) => this.handleTextFieldChanges('bio', event.target.value)} value={this.state.bio} />
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