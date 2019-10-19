import {
    observable,
    action,
} from 'mobx';

import enCA from '../data/en-CA';
import frCA from '../data/fr-CA';

export class TranslationStore {
    @observable type = 'en-CA';
    @observable translation = {
        'en-CA': enCA,
        'fr-CA': frCA,
    };

    @action changeTranslations (type) {
        this.type = type;
    }

    getTranslation (section, key) {
        let missingTranslation = key ? `?${section}-${key}?` : `?${section}?`;
        if (section && key && this.translation[this.type] && this.translation[this.type][section] && this.translation[this.type][section][key]) {
            const translation = this.translation[this.type][section][key];
            if (typeof translation === 'string') {
                return translation;
            }
        } else if (section && key) {
            return missingTranslation;
        } else if (section) {
            key = section;
            const translation = this.translation[this.type][key];
            if (translation && typeof translation === 'string') {
                return translation;
            }
            for (const sectionName in this.translation[this.type]) {
                const section = this.translation[this.type][sectionName];
                if (typeof section === 'object' && key in section && typeof section[key] === 'string') {
                    return section[key];
                }
            }
        }
        return missingTranslation;
    }
}
