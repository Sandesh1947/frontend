import React from 'react'
import { Nav, Container, Row, Col } from 'react-bootstrap'
import EditProfileContainer from '../editProfile/EditProfileContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import './styles.scss'
class SettingsView extends React.Component {
    constructor() {
        super()
        this.state = { path: 1 }
        this.setPath = this.setPath.bind(this)
    }
    componentDidMount() {
        this.setPath()
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setPath()
        }
    }
    setPath() {
        let location = this.props.location
        if (location.pathname === '/settings/editprofile') {
            this.setState({ path: 1 })
        }
        else {
            this.setState({ path: 2 })
        }
    }
    render() {
        return (
            <Container className="content mb-5">
                <Row>
                    <Col md={3}>
                        <Nav defaultActiveKey="/home" className="flex-column nav-bar-container">
                            <Nav.Link href="/home"><span className={this.state.path === 1 ? 'link-navbar-selected' : 'link-navbar'}><FontAwesomeIcon icon={faPencilAlt} />  Edit Profile</span></Nav.Link>
                            <Nav.Link> <span className={this.state.path === 2 ? 'link-navbar-selected' : 'link-navbar'}><FontAwesomeIcon icon={faLock} />  Privacy</span> </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={9}>
                        <EditProfileContainer />
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default SettingsView