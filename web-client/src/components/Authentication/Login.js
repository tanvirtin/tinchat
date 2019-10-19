import React from 'react';
import Utils from '../../utils';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import Notify from '../Notify';

import './styles.scss';

export default Utils.decorateWithMobX(props => {
    const { translation } = props;
    return (
        <Container>
            <Notify
                show = {props.showNotify}
                message = {props.message}
            />
            <Row className = 'justify-content-md-center login-container'>
                <Col md = {4}>
                    <Form onSubmit = {props.onSubmit}>
                        <Form.Group controlId = 'email'>
                            <Form.Label>{translation.getTranslation('email')}</Form.Label>
                            <Form.Control type = 'email' placeholder = {translation.getTranslation('enterEmail')} />
                        </Form.Group>
                        <Form.Group controlId = 'password'>
                            <Form.Label>{translation.getTranslation('password')}</Form.Label>
                            <Form.Control type = 'password' placeholder = {translation.getTranslation('password')} />
                        </Form.Group>
                        <Button type = 'submit' loading = {props.formSubmitted} primary>
                            {translation.getTranslation('submit')}
                        </Button>
                        <Form.Text className="text-muted authentication-link">
                            <a href='/register'>{translation.getTranslation('gotoRegistration')}</a>
                        </Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
});
