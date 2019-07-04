import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { peopleSearch } from '../../actions/searchAction'
import { BASE_URL } from '../../app.constants';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default class PeopleTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [], lastScrollPos: 0,
            page: 1, noMoreData: false, loading: false
        }
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
        console.log(this.state)
        if (this.state.noMoreData && this.state.loading) {
            return;
        }
        this.setState({ loading: true })
        console.log('in load more people')
        peopleSearch({ 'page': this.state.page + 1,'search' :this.props.keyword }).then(
            (res) => {
                console.log(res)
                if (res && res.data) {
                    console.log(this.state.searchResults.concat(res.data))
                    this.setState({ searchResults: this.state.searchResults.concat(res.data), loading: false })
                }
                else {
                    this.setState({ noMoreData: true })
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
    render() {
        return (
            <React.Fragment>
                {this.state.searchResults.map(
                    (user, key) => (
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