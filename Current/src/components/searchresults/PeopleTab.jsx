import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { peopleSearch } from '../../actions/searchAction'
import { BASE_URL } from '../../app.constants';

export default class PeopleTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [], lastScrollPos: 0,
            page: 1, noMoreData: false, loading: true
        }
    }
    componentDidMount() {
        if (this.props.keyword) {
            peopleSearch(this.props.keyword).then(
                (res) => {
                    this.setState({ searchResults: res.data })
                }
            )
        }
    }
    componentDidUpdate(prevProps) {
        if ((this.props.keyword !== prevProps.keyword) && this.props.keyword) {
            peopleSearch(this.props.keyword).then(
                (res) => {
                    this.setState({ searchResults: res.data })
                }
            )
        }
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    loadMoreData = () => {
        if (this.state.noMoreData && this.state.loading) {
            return;
        }
        this.setState({ loading: true })
        peopleSearch({ page: this.state.page + 1 }).then(
            (res) => {
                if (res && res.data) {
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
                {this.state.noMoreData &&<div className='text-center'>No more data to load</div>}
            </React.Fragment>
        )
    }
}