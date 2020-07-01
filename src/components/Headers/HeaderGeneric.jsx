import React, { Component } from 'react';
import { Container } from "reactstrap";

export default class HeaderGeneric extends Component {
    render() {
        return (
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            <Container fluid>
                <div className="header-body">                
                </div>
            </Container>
        </div>
        )
    }
}
