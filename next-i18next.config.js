/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        defaultLocale: 'ua',
        locales: ['en', 'ua'],
    },
    defaultNS: 'common',
    fallbackLng: 'ua',
    localeDetection: false,
    // reloadOnPrerender: isLocalEnv,
    saveMissing: true,
    serializeConfig: false,
    // use: [i18nextMiddleware.LanguageDetector],
    detection: {
        caches: ['cookie'],
        lookupCookie: 'i18next',
        order: ['cookie', 'path', 'header'],
    },
}