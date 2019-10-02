import React from 'react';
import wrapper from '../../utils/stateless-component-wrapper';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import './styles.scss';

export default wrapper(props => {
    const { translations } = props;
    return (
        <Container>
            <Row className = 'justify-content-md-center login-container'>
                <Col md = {4}>
                    <Form>
                        <Form.Group controlId = 'email'>
                            <Form.Label>{translations.getTranslation('email')}</Form.Label>
                            <Form.Control type = 'email' placeholder = {translations.getTranslation('enterEmail')} />
                        </Form.Group>
                        <Form.Group controlId = 'password'>
                            <Form.Label>{translations.getTranslation('password')}</Form.Label>
                            <Form.Control type = 'password' placeholder = {translations.getTranslation('password')} />
                        </Form.Group>
                        <Button className = 'login-button' variant = 'primary' type = 'submit'>
                            {translations.getTranslation('submit')}
                        </Button>
                        <Form.Text className="text-muted registration-link">
                            <a href='/register'>{translations.getTranslation('gotoRegistration')}</a>
                        </Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});
