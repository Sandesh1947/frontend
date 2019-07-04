import React from 'react'
import SearchResultsView from './searchResultsView'
import './searchresults.scss'
class SearchResultsContainer extends React.Component {
    render() {
        return(
            <SearchResultsView {...this.props}/>
        )
    }
}
  
export default SearchResultsContainer
