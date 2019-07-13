import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import titleTop from '../../assets/title-top.png';
import ContentCard from '../content-card/content-card';
import './profileCenter.scss';
import isEqual from 'lodash/isEqual';

export default class ProfileCenter extends Component {
  constructor() {
    super()
    this.state = { selectedTab: 'updates', workPublication: [], updatedPublication: [] }
    this.getUpdates = this.getUpdates.bind(this)
    this.getWorks = this.getWorks.bind(this)
  }
  componentDidMount() {
    this.setState({ workPublication: this.getWorks() })
    this.setState({ updatedPublication: this.getUpdates() })
  }
  componentDidUpdate(prevProps) {
    if(!isEqual(prevProps,this.props)) {
      this.setState({ workPublication: this.getWorks() })
      this.setState({ updatedPublication: this.getUpdates() })
    }
  }
  getWorks() {
    console.log('####### in works')
    console.log(this.props.userPublications)
    console.log(this.props.userPublications.filter((publication) => publication.publication_type === "2"))
    return this.props.userPublications.filter((publication) => publication.publication_type === "2")
  }
  getUpdates() {
    console.log('####### in updates')
    console.log(this.props.userPublications)
    console.log(this.props.userPublications.filter((publication) => publication.publication_type === "1"))
    return this.props.userPublications.filter((publication) => publication.publication_type === "1")
  }
  render() {
    return (
      <div className="right">
        <figure className="title-img">
          <Image src={titleTop} className="title-img__image" />
        </figure>

        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.selectedTab}
          onSelect={key => this.setState({ 'selectedTab': key })}
        >
          <Tab eventKey="updates" title="Updates" unmountOnExit={true}>
            {this.state.updatedPublication.map((userPublication, index) => (
              <ContentCard
                key={index}
                postIndex={index}
                user={this.props.user}
                userPublication={userPublication}
                userPublications={this.props.userPublications}
              />
            ))}
          </Tab>
          <Tab eventKey="works" title="Works" unmountOnExit={true}>
            {this.state.workPublication.map((userPublication, index) => (
              <ContentCard
                key={index}
                postIndex={index}
                user={this.props.user}
                userPublication={userPublication}
                userPublications={this.props.userPublications}
              />
            ))}
          </Tab>
          <Tab eventKey="audience" title="Audience" unmountOnExit={true}>
            <div>Audience</div>
          </Tab>
        </Tabs>

        {this.props.loading && <div className="mt-3 font-weight-bold">
          <Alert variant="light">
            <Spinner animation="grow" size="sm" /> Loading...
          </Alert>
        </div>}
      </div>
    );
  }
}
