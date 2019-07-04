import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PubicationsTab from './PublicationTab'
import PeopleTab from './PeopleTab'
export default class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 'selectedTab': 'people' }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}><h2 className='search-header mb-2'>Search Results {this.props.keyword.keyword && <span>for "{this.props.keyword.keyword}"</span>}</h2></Col>
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
                                <PeopleTab keyword={this.props.keyword} />
                            </Tab>
                            <Tab eventKey="publications" title="Pulibcations" unmountOnExit={true}>
                                <PubicationsTab keyword={this.props.keyword} />
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
