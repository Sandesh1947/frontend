import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {peopleSearch} from '../../actions/searchAction'
import { BASE_URL } from '../../app.constants';

export default class PeopleTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {searchResults:[]}
    }
    // componentDidMount() {
    //     peopleSearch(this.props.keyword).then(
    //         (res) =>{
    //             this.setState({searchResults:res.data})
    //         }
    //     )
    // }
    componentDidUpdate(prevProps) {
        if(this.props.keyword !== prevProps.keyword) {
            peopleSearch(this.props.keyword).then(
                (res) =>{
                    this.setState({searchResults:res.data})
                }
            )
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.searchResults.map(
                    (user,key) => (
                        <Row key={key} className='user-item-container'>
                            <Col className='flex-container' md={4}>
                            <span><img className='user-image' src={BASE_URL + user.avatar} alt='avatar' /></span>
                            <div className='flex-container flex-direction-column user-details-div'>
                            <span>{user.first_name} {user.last_name}</span>
                            <span>@{user.email}</span>
                            </div>
                            </Col>
                        </Row>
                    )
                )}
            </React.Fragment>
        )
    }
}