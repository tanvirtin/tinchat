import React, { Component } from 'react';
import TranslationSwitch from './TranslationSwitch';
import {
    inject,
    observer,
} from 'mobx-react';

@inject(store => ({ translation: store.translation }))
@observer
class TranslationSwitchContainer extends Component {
    constructor (props) {
        super(props);
        this.state = { checked: false };
    }

    handleChange () {
        const { translation } = this.props;
        this.setState({
            checked: !this.state.checked,
        }, () => {
            this.state.checked
                ? translation.changeTranslations('fr-CA')
                : translation.changeTranslations('en-CA');
        });
    }

    render () {
        const { translation } = this.props;
        return (
            <TranslationSwitch
                label = { translation.type }
                checked = { this.state.checked }
                handleChange = { this.handleChange.bind(this) }
            />
        );
    }
}

export default TranslationSwitchContainer;
