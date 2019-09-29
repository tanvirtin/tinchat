import React from 'react';
import Switch from 'react-switch';

import './styles.scss';

export default props => {
    return (
        <label className = 'translation-switch-container'>
            <span>{ props.label }</span>
            <Switch
                className = 'translation-switch'
                checked = { props.checked }
                onChange = { props.handleChange }
                onColor = "#86d3ff"
                offColor = "#86d3ff"
                handleDiameter = { 25 }
                uncheckedIcon = { false }
                checkedIcon = { false }
                boxShadow = "0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow = "0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height = { 20 }
                width = { 48 }
            />
        </label>
    );
};
