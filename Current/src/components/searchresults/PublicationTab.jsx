import React from 'react'
import ContentCard from '../content-card/content-card';
import { publicationSearch } from '../../actions/searchAction'
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default class PubicationsTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [], lastScrollPos: 0,
            page: 1, noMoreData: false, loading: false
        }
        this.loadMoreData = this.loadMoreData.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
        if (this.props.keyword) {
            this.setState({loading:true})
            publicationSearch({'search' :this.props.keyword}).then(
                (res) => {
                    this.setState({ searchResults: res.data, loading: false })
                }
            )
        }
    }
    componentDidUpdate(prevProps) {
        if ((this.props.keyword !== prevProps.keyword) && this.props.keyword) {
            this.setState({ loading: true })
            publicationSearch({'search' :this.props.keyword}).then(
                (res) => {
                    this.setState({ searchResults: res.data, loading: false })
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
        publicationSearch({ 'page': this.state.page + 1,'search' :this.props.keyword }).then(
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
    render() {
        return (
            <React.Fragment>
                {this.state.searchResults.map((value, index) => {
                    return <ContentCard key={index} id={index} userPublication={value} userPublications={this.state.searchResults} />
                })}
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