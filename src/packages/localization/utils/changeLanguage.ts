import i18n, { LanguageType } from 'packages/localization';

export const changeLanguage = (value: LanguageType) => {
    i18n.changeLanguage(value).then(() => {
        // TODO: function save key to store
        // Storages.set(KeyStorage.Language, value).catch();
    });
};
