const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'messages/',
  whitelistsDirectory: 'messages/whitelists/',
  translationsDirectory: 'src/lang/',
  languages: ['de', 'fr', 'es']
});
