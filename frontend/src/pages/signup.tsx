import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { fetchRequest } from '../utils';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; name?: string; password?: string }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; name?: string; password?: string } = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }

        if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit form
            fetchRequest(`${process.env.REACT_APP_API_URL}/user/create`, 'POST',
                 { email, name, password },
                'User created successfully');
        
            console.log('Form submitted', { email, name, password });
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Signup</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!!errors.name}
                            />
                            {errors.name && <Alert variant="danger">{errors.name}</Alert>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Signup
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;