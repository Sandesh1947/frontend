import React from 'react'
import './styles.scss'
import { Row, Col, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual'
import { BASE_URL } from '../../app.constants';
import isEmail from 'validator/lib/isEmail';

class EditProfileView extends React.Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            dob: '',
            school: '',
            profession: '',
            phone: '',
            email: '',
            location: '',
            bio: '',
            avatar: '',
            coverpic: '',
            fieldsChanged: {},
            empty_first_name: false,
            empty_last_name: false,
            empty_dob: false,
            empty_email: false,
            empty_bio: false,
            is_valid_email: true
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
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.userInfo, this.props.userInfo)) {
            this.initValues()
        }
    }
    initValues() {
        let userInfo = this.props.userInfo
        this.setState({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            dob: userInfo.dob,
            school: userInfo.school,
            profession: userInfo.profession,
            phone: userInfo.phone,
            email: userInfo.email,
            location: userInfo.location,
            bio: userInfo.bio,
            avatar: BASE_URL + userInfo.avatar,
            coverpic: BASE_URL + userInfo.coverPic,
        })
    }
    handleSave() {
        let changedFields = this.state.fieldsChanged
        if (!isEmpty(changedFields) && !this.state.empty_bio && !this.state.empty_dob && !this.state.empty_email && !this.state.empty_first_name && !this.state.empty_last_name && this.state.is_valid_email)
            this.props.editProfile(changedFields)
    }
    handleDateOfBirth(value) {
        this.birthDate = value
        let changedFields = this.state.fieldsChanged
        Object.assign(changedFields, { dob: moment(value).format("YYYY-MM-DD") })
        this.setState({ fieldsChanged: changedFields })
        this.setState({ dob: moment(value).format("YYYY-MM-DD") })
        if (!value)
            this.setState({ empty_dob: true })
        else
            this.setState({ empty_dob: false })
    }
    handleTextFieldChanges(field, value) {
        let changedFields = this.state.fieldsChanged
        switch (field) {
            case 'first_name': this.setState({ first_name: value });
                Object.assign(changedFields, { first_name: value })
                this.setState({ fieldsChanged: changedFields })
                if (value === '')
                    this.setState({ empty_first_name: true })
                else
                    this.setState({ empty_first_name: false })
                break;
            case 'last_name': this.setState({ last_name: value });
                Object.assign(changedFields, { last_name: value })
                this.setState({ fieldsChanged: changedFields })
                if (value === '')
                    this.setState({ empty_last_name: true })
                else
                    this.setState({ empty_last_name: false })
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
                if (value === '')
                    this.setState({ empty_bio: true })
                else
                    this.setState({ empty_bio: false })
                break;
            case 'school': this.setState({ school: value });
                Object.assign(changedFields, { school: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            case 'email': this.setState({ email: value });
                Object.assign(changedFields, { email: value })
                this.setState({ fieldsChanged: changedFields });
                if (value === '')
                    this.setState({ empty_email: true })
                else
                    this.setState({ empty_email: false })
                if (isEmail(value))
                    this.setState({ is_valid_email: true })
                else
                    this.setState({ is_valid_email: false })
                break;
            case 'location': this.setState({ location: value });
                Object.assign(changedFields, { location: value })
                this.setState({ fieldsChanged: changedFields })
                break;
            default: return
        }
    }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={8}>
                        <h1 className='edit-profile-header'>Edit Profile</h1>
                        <p className='sub-heading-edit-profile'>People in Eycon will get to know you with following information</p>
                    </Col>
                    <Col md={4}>
                        <div className='d-flex'>
                            <div className='mr-3'><Button onClick={() => { this.initValues() }} variant="outline-danger">Cancel</Button></div>
                            <div ><Button onClick={this.handleSave} variant="outline-success">Save</Button></div>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>First name</label>
                        <input type="text" className={this.state.empty_first_name ? 'empty-edit-profile-border form-control' : "form-control"} placeholder="First name" onChange={(event) => this.handleTextFieldChanges('first_name', event.target.value)} value={this.state.first_name} />
                        {this.state.empty_first_name && <span style={{ color: 'red' }}>This Field cannot be empty</span>}
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Last name</label>
                        <input type="text" className={this.state.empty_last_name ? 'empty-edit-profile-border form-control' : "form-control"} placeholder="Last name" onChange={(event) => this.handleTextFieldChanges('last_name', event.target.value)} value={this.state.last_name} />
                        {this.state.empty_last_name && <span style={{ color: 'red' }}>This Field cannot be empty</span>}
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Date of birth</label>
                        <div className={this.state.empty_dob ? 'empty-edit-profile-border form-control' : "form-control"}>
                            <DatePicker
                                placeholderText='Date of birth'
                                selected={this.birthDate}
                                onChange={this.handleDateOfBirth}
                            />
                        </div>
                        {this.state.empty_dob && <span style={{ color: 'red' }}>This Field cannot be empty</span>}
                        {/* <input type="date" className="form-control" placeholder="Date of birth" onChange={(event)=>this.handleTextFieldChanges('dob',event.target.value)} value={this.state.dob} /> */}
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Email</label>
                        <input type="text" className={this.state.empty_email || !this.state.is_valid_email ? 'empty-edit-profile-border form-control' : "form-control"} placeholder="Email" onChange={(event) => this.handleTextFieldChanges('email', event.target.value)} value={this.state.email} />
                        {this.state.empty_email && <span style={{ color: 'red' }}>This Field cannot be empty</span>}
                        {!this.state.is_valid_email && <span style={{ color: 'red' }}>This email id is not valid</span>}
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone" onChange={(event) => this.handleTextFieldChanges('phone', event.target.value)} value={this.state.phone} />
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Profession</label>
                        <input type="text" className="form-control" placeholder="Profession" onChange={(event) => this.handleTextFieldChanges('profession', event.target.value)} value={this.state.profession} />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>School</label>
                        <input type="text" className="form-control" placeholder="School" onChange={(event) => this.handleTextFieldChanges('school', event.target.value)} value={this.state.school} />
                    </Col>
                    <Col md={6}>
                        <label className='sub-heading-edit-profile'>Location</label>
                        <input type="text" className="form-control" placeholder="Phone" onChange={(event) => this.handleTextFieldChanges('location', event.target.value)} value={this.state.location} />
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col md={12}>
                        <label className='sub-heading-edit-profile'>Bio</label>
                        <textarea type="text" className={this.state.empty_bio ? 'empty-edit-profile-border form-control' : "form-control"} placeholder="Bio" onChange={(event) => this.handleTextFieldChanges('bio', event.target.value)} value={this.state.bio} />
                        {this.state.empty_bio && <span style={{ color: 'red' }}>This Field cannot be empty</span>}
                    </Col>

                </Row>
            </React.Fragment>
        )
    }
}
export default EditProfileView