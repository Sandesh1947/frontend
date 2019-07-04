import React from 'react'
import ContentCard from '../content-card/content-card';
import {publicationSearch} from '../../actions/searchAction'
export default class PubicationsTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {searchResults:[]}
    }
    componentDidMount() {
        publicationSearch(this.props.keyword).then(
            (res) =>{
                console.log('in publications')
                console.log(res)
                this.setState({searchResullts:res.data})
            }
        )
    }
    componentDidUpdate(prevProps) {
        if(this.props.keyword !== prevProps.keyword) {
            publicationSearch(this.props.keyword).then(
                (res) =>{
                    console.log('in publications')
                    console.log(res)
                    this.setState({searchResullts:res.data})
                }
            )
        }
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