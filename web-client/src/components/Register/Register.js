import React from 'react';
import Utils from '../../utils';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import Notify from '../Notify';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    const { translations } = props;
    return (
        <Container>
            <Notify
                show = {props.showNotify}
                message = {props.message}
            />
            <Row className = 'justify-content-md-center register-container'>
                <Col md = {4}>
                    <Form onSubmit = {props.onSubmit}>
                        <Form.Group controlId = 'email'>
                            <Form.Label>{translations.getTranslation('email')}</Form.Label>
                            <Form.Control type = 'email' placeholder = {translations.getTranslation('enterEmail')} />
                        </Form.Group>
                        <Form.Group controlId = 'password'>
                            <Form.Label>{translations.getTranslation('password')}</Form.Label>
                            <Form.Control type = 'password' placeholder = {translations.getTranslation('password')} />
                        </Form.Group>
                        <Form.Group controlId = 'firstName'>
                            <Form.Label>{translations.getTranslation('firstName')}</Form.Label>
                            <Form.Control type = 'text' placeholder = {translations.getTranslation('firstName')} />
                        </Form.Group>
                        <Form.Group controlId = 'lastName'>
                            <Form.Label>{translations.getTranslation('lastName')}</Form.Label>
                            <Form.Control type = 'text' placeholder = {translations.getTranslation('lastName')} />
                        </Form.Group>
                        <Button type = 'submit' loading = {props.formSubmitted} primary>
                            {translations.getTranslation('submit')}
                        </Button>
                        <Form.Text className="text-muted login-link">
                            <a href='/login'>{translations.getTranslation('gotoLogin')}</a>
                        </Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});
