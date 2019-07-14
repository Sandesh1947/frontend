import React from 'react'
import {Col,Alert,Spinner,Row,Popover,Overlay} from 'react-bootstrap';
import { peopleSearch } from '../../actions/searchAction'
import { BASE_URL } from '../../app.constants';
import {Link} from 'react-router-dom'
import queryString from 'query-string';
export default class PeopleTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [], lastScrollPos: 0,
            page: 1, noMoreData: false, loading: false,showPopOver:[]
        }
        this.handlePopOver =this.handlePopOver.bind(this)
        this.refList =[];
    }
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
        if (this.props.keyword) {
            this.setState({loading:true})
            peopleSearch({'search' :this.props.keyword}).then(
                (res) => {
                    this.setState({ searchResults: res.data ,loading:false})
                }
            )
        }
        document.addEventListener('click',(event) => {
            let currentState = this.state.showPopOver
            if(event.target.id !=='username') {
                currentState.forEach((element,key) => {
                    if(currentState[key])
                    currentState[key] = false
                });
                this.setState({showPopOver:currentState})
            }
        })
    }
    componentDidUpdate(prevProps) {
        if ((this.props.keyword !== prevProps.keyword) && this.props.keyword) {
            this.setState({loading:true})
            peopleSearch({'search' :this.props.keyword}).then(
                (res) => {
                    this.setState({ searchResults: res.data,loading:false })
                }
            )
        }
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    loadMoreData = () => {
        if (this.state.noMoreData || this.state.loading) {
            return;
        }
        this.setState({ loading: true })
        peopleSearch({ 'page': this.state.page + 1,'search' :this.props.keyword }).then(
            (res) => {
                if (res && res.data.length !==0) {
                    this.setState({ searchResults: this.state.searchResults.concat(res.data), loading: false })
                }
                else {
                    this.setState({ noMoreData: true,loading: false })
                }
            }
        );
        this.setState({ page: this.state.page + 1 });
    }

    trackScrolling = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        if (!this.state.noMoreData && !this.state.loading
            && this.state.lastScrollPos < scrolled && Math.ceil(scrolled) >= scrollable - 100) {
            this.loadMoreData();
        }

        this.setState({ lastScrollPos: scrolled });
    }
    handlePopOver(user,key) {
        if(user.currentuser ===0 && !this.state.showPopOver[key]) {
            let currentState = this.state.showPopOver
            currentState[key] = true
            this.setState({showPopOver:currentState})
        }
        else {
            let currentState = this.state.showPopOver
            currentState[key] = false
            this.setState({showPopOver:currentState})
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.searchResults.map(
                    (user, key) => (
                        <Row key={key} className='user-item-container'>
                            <Col className='flex-container' md={4}>
                                <span><img className='user-image' src={BASE_URL + user.avatar} alt='avatar' /></span>
                                <div className='flex-container flex-direction-column user-details-div'>
                                    <span id='username' className='search-username'  ref={refList => this.refList[key] = refList} onClick={() => this.handlePopOver(user,key)}>{user.first_name} {user.last_name}</span>
                                    <Overlay
                                        show={this.state.showPopOver[key]}
                                        target={this.refList[key]}
                                        placement="bottom"

                                    >
                                        <Popover id="popover-contained" title="View Profile">
                                            <strong><Link to={{pathname:'/profile/?user='+user.id,search: queryString.stringify(Object.assign({}, {user_id:user.id})),state:{currentuser:user.currentuser}}}>Click to view profile of {user.first_name}</Link></strong>
                                        </Popover>
                                    </Overlay>
                                    <span>@{user.email}</span>
                                </div>
                            </Col>
                        </Row>
                    )
                )}
                {this.state.loading && <div className='mt-3 font-weight-bold'>
                    <Alert variant='light'>
                        <Spinner animation='grow' size='sm' /> Loading...
                    </Alert>
                </div>}
                {this.state.noMoreData &&<div className='text-center'>No more data to load</div>}
            </React.Fragment>
        )
    }
}