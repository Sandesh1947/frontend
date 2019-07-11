import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PubicationsTab from './PublicationTab'
import PeopleTab from './PeopleTab'
import queryString from 'query-string'
import isEqual from 'lodash/isEqual';
export default class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 'selectedTab': 'people',keyword:queryString.parse(props.location.search).search }
    }
    componentDidUpdate(prevProps) {
        if(!isEqual(this.props.location.search,prevProps.location.search)) {
            this.setState({keyword:queryString.parse(this.props.location.search).search})
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}><h2 className='search-header mb-2'>Search Results {this.state.keyword && <span>for "{this.state.keyword}"</span>}</h2></Col>
                    <Col md={1}></Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.state.selectedTab}
                            onSelect={key => this.setState({ 'selectedTab': key })}
                        >
                            <Tab eventKey="people" title="People" unmountOnExit={true}>
                                <PeopleTab keyword={this.state.keyword} />
                            </Tab>
                            <Tab eventKey="publications" title="Publications" unmountOnExit={true}>
                                <PubicationsTab keyword={this.state.keyword} />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col md={1}>

                    </Col>
                </Row>
            </Container>
        )
    }
}
