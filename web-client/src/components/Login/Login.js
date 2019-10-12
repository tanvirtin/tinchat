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
            <Row className = 'justify-content-md-center login-container'>
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
                        <Button type = 'submit' loading = {props.formSubmitted} primary>
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
