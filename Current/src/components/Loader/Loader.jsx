import React from 'react'
import { Instagram } from 'react-content-loader'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default class Loader extends React.Component {
    render() {
        return(
            <Container>
            <Row><Col md={3}></Col><Col md={6}><Instagram /></Col><Col md={3}></Col></Row>
            <Row><Col md={3}></Col><Col md={6}><Instagram /></Col><Col md={3}></Col></Row>
            </Container>
        )
    }
}