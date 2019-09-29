import React from 'react';
import wrapper from '../../utils/stateless-component-wrapper';

import './styles.scss';

export default wrapper(props => {
    const { translations } = props;
    return (
        <div>
            <div>
                { translations.getTranslation('Home') }
            </div>
        </div>
    );
});
