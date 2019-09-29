import {
    observable,
    action,
} from 'mobx';

import enCA from '../data/en-CA';
import frCA from '../data/fr-CA';

class Translations {
    @observable type = 'en-CA';
    @observable translations = {
        'en-CA': enCA,
        'fr-CA': frCA,
    };

    @action changeTranslations (type) {
        this.type = type;
    }

    getTranslation (section, key) {
        if (section && key && this.translations[this.type] && this.translations[this.type][section] && this.translations[this.type][section][key]) {
            return this.translations[this.type][section][key];
        } else if (section) {
            key = section;
            for (const sectionName in this.translations[this.type]) {
                const section = this.translations[this.type][sectionName];
                if (section && key in section) {
                    return section[key];
                }
            }
        }
        return 'Unknown';
    }
}

export default Translations;
