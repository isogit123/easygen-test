import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { fetchRequestWithCallback, saveToken } from '../utils';

const Home: React.FC = () => {

    useEffect(() => {
        // Handle sign-in logic here
        fetchRequestWithCallback(`${process.env.REACT_APP_API_URL}/user/signedinUser`, 'GET',
            null, () => { }, true);
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Welcome to the application.</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;