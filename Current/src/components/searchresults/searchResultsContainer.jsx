import React from 'react'
import SearchResultsView from './searchResultsView'
import './searchresults.scss'
import {connect} from 'react-redux'
class SearchResultsContainer extends React.Component {
    render() {
        return(
            <SearchResultsView keyword={this.props.keyword}/>
        )
    }
}
const mapStateToProps = state => ({
    keyword: state.keyword
  });
  
export default connect(mapStateToProps) (SearchResultsContainer)
