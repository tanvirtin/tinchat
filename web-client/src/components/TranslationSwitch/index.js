import React, { Component } from 'react';
import TranslationSwitch from './TranslationSwitch';
import {
    inject,
    observer,
} from 'mobx-react';

@inject(store => ({ translations: store.translations }))
@observer
class TranslationSwitchContainer extends Component {
    constructor (props) {
        super(props);
        this.state = { checked: false };
    }

    handleChange () {
        const { translations } = this.props;
        this.setState({
            checked: !this.state.checked,
        }, () => {
            this.state.checked
                ? translations.changeTranslations('fr-CA')
                : translations.changeTranslations('en-CA');
        });
    }

    render () {
        const { translations } = this.props;
        return (
            <TranslationSwitch
                label = { translations.type }
                checked = { this.state.checked }
                handleChange = { this.handleChange.bind(this) }
            />
        );
    }
}

export default TranslationSwitchContainer;
