import React from 'react'
import ContentCard from '../content-card/content-card';
import { publicationSearch } from '../../actions/searchAction'
export default class PubicationsTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [], lastScrollPos: 0,
            page: 1, noMoreData: false, loading: true
        }
        this.loadMoreData = this.loadMoreData.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
        publicationSearch(this.props.keyword).then(
            (res) => {
                this.setState({ searchResults: res.data, loading: false })
            }
        )
    }
    componentDidUpdate(prevProps) {
        if (this.props.keyword !== prevProps.keyword) {
            this.setState({ loading: true })
            publicationSearch(this.props.keyword).then(
                (res) => {
                    this.setState({ searchResults: res.data, loading: false })
                }
            )
        }
    }

    loadMoreData = () => {
        if (this.state.noMoreData && this.state.loading) {
            return;
        }
        this.setState({ loading: true })
        publicationSearch({ page: this.state.page + 1 }).then(
            (res) => {
                if (res && res.data) {
                    this.setState({ searchResults: res.data, loading: false })
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
                {this.state.searchResults.map((value, index) => {
                    return <ContentCard key={index} id={index} userPublications={value} userPublicationsArray={this.state.searchResults} />
                })}
            </React.Fragment>
        )
    }
}