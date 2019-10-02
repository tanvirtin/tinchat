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
        let missingTranslation = key ? `?${section}-${key}?` : `?${section}?`;
        if (section && key && this.translations[this.type] && this.translations[this.type][section] && this.translations[this.type][section][key]) {
            const translation = this.translations[this.type][section][key];
            if (typeof translation === 'string') {
                return translation;
            }
        } else if (section && key) {
            return missingTranslation;
        } else if (section) {
            key = section;
            const translation = this.translations[this.type][key];
            if (translation && typeof translation === 'string') {
                return translation;
            }
            for (const sectionName in this.translations[this.type]) {
                const section = this.translations[this.type][sectionName];
                if (typeof section === 'object' && key in section && typeof section[key] === 'string') {
                    return section[key];
                }
            }
        }
        return missingTranslation;
    }
}

export default Translations;
