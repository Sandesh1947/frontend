import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import ContentCard from '../content-card/content-card';
import './profileCenter.scss';
import isEqual from 'lodash/isEqual';
import { BASE_URL } from '../../app.constants';

export default class ProfileCenter extends Component {
  constructor() {
    super()
    this.state = { selectedTab: 'updates', workPublication: [], updatedPublication: [],coverPicChanged:false }
    this.getUpdates = this.getUpdates.bind(this)
    this.getWorks = this.getWorks.bind(this)
    this.onFileUploadCoverPic= this.onFileUploadCoverPic.bind(this)
    this.initProfilePic = this.initProfilePic.bind(this)
  }
  componentDidMount() {
    this.setState({ workPublication: this.getWorks() })
    this.setState({ updatedPublication: this.getUpdates() })
  }
  componentDidUpdate(prevProps) {
    if(!isEqual(prevProps,this.props)) {
      this.setState({ workPublication: this.getWorks() })
      this.setState({ updatedPublication: this.getUpdates() })
      this.initProfilePic();
    }
  }
  getWorks() {
    return this.props.userPublications.filter((publication) => publication.publication_type === "2")
  }
  getUpdates() {
    return this.props.userPublications.filter((publication) => publication.publication_type === "1")
  }
  initProfilePic() {
    const user = this.props.user ? this.props.user[0] : undefined
    if(user)
    this.setState({coverpic : BASE_URL + user.coverpic,coverPicChanged:false})
  }
  onFileUploadCoverPic(e) {
    if (!e.target.files.length) {
        return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.loadImage(attachment)

}
loadImage(attachment) {
  const reader = new FileReader();
  reader.onload = e => {
      this.setState({ 'coverpic': e.target.result,coverPicChanged:true });
  };
  reader.readAsDataURL(attachment);
}
  render() {
    const user = this.props.user ? this.props.user[0]:undefined
    return (
      <div className="right">
        <figure className="title-img">

          <React.Fragment>
            <div className='coverpic-container'>
              <label htmlFor='cover-pic'>
                <Image src={this.state.coverpic} className="title-image" />
              </label>
              <input
                className="d-none"
                type="file"
                id='cover-pic'
                name='cover-pic'
                onChange={this.onFileUploadCoverPic}
              />
            </div>
            {this.state.coverPicChanged && <div className='d-flex'>
              <Button size="sm" className='mr-3' onClick={() => this.props.editProfile({ coverpic: this.state.coverpic })} variant="outline-success">Save</Button>
              <Button size="sm" onClick={() => { this.initProfilePic() }} variant="outline-danger">Cancel</Button>
            </div>}
          </React.Fragment> 
          <Image  src={user && BASE_URL + user.coverpic} className="title-img__image" />
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
