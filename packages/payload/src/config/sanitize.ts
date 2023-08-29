import merge from 'deepmerge';
import { isPlainObject } from 'is-plain-object';

import type { Config, LocalizationConfigWithLabels, LocalizationConfigWithNoLabels, SanitizedConfig, SanitizedLocalizationConfig } from './types.js';

import { defaultUserCollection } from '../auth/defaultUser.js';
import getDefaultBundler from '../bundlers/webpack/bundler.js';
import sanitizeCollection from '../collections/config/sanitize.js';
import { migrationsCollection } from '../database/migrations/migrationsCollection.js';
import { InvalidConfiguration } from '../errors/index.js';
import sanitizeGlobals from '../globals/config/sanitize.js';
import getPreferencesCollection from '../preferences/preferencesCollection.js';
import checkDuplicateCollections from '../utilities/checkDuplicateCollections.js';
import { defaults } from './defaults.js';

const sanitizeAdminConfig = (configToSanitize: Config): Partial<SanitizedConfig> => {
  const sanitizedConfig = { ...configToSanitize };

  // add default user collection if none provided
  if (!sanitizedConfig?.admin?.user) {
    const firstCollectionWithAuth = sanitizedConfig.collections.find(({ auth }) => Boolean(auth));
    if (firstCollectionWithAuth) {
      sanitizedConfig.admin.user = firstCollectionWithAuth.slug;
    } else {
      sanitizedConfig.admin.user = defaultUserCollection.slug;
      sanitizedConfig.collections.push(defaultUserCollection);
    }
  }

  if (!sanitizedConfig.collections.find(({ slug }) => slug === sanitizedConfig.admin.user)) {
    throw new InvalidConfiguration(`${sanitizedConfig.admin.user} is not a valid admin user collection`);
  }

  // add default bundler if none provided
  if (!sanitizedConfig.admin.bundler) {
    sanitizedConfig.admin.bundler = getDefaultBundler();
  }

  return sanitizedConfig as unknown as Partial<SanitizedConfig>;
};

export const sanitizeConfig = (incomingConfig: Config): SanitizedConfig => {
  const configWithDefaults: Config = merge(defaults, incomingConfig, {
    isMergeableObject: isPlainObject,
  }) as Config;

  const config: Partial<SanitizedConfig> = sanitizeAdminConfig(configWithDefaults);

  if (config.localization && config.localization.locales?.length > 0) {
    // clone localization config so to not break everything
    const firstLocale = config.localization.locales[0];
    if (typeof firstLocale === 'string') {
      (config.localization as SanitizedLocalizationConfig).localeCodes = [...(config.localization as unknown as LocalizationConfigWithNoLabels).locales];

      // is string[], so convert to Locale[]
      (config.localization as SanitizedLocalizationConfig).locales = (config.localization as unknown as LocalizationConfigWithNoLabels).locales.map((locale) => ({
        code: locale,
        label: locale,
        rtl: false,
        toString: () => locale,
      }));
    } else {
      // is Locale[], so convert to string[] for localeCodes
      (config.localization as SanitizedLocalizationConfig).localeCodes = (config.localization as SanitizedLocalizationConfig).locales.reduce((locales, locale) => {
        locales.push(locale.code);
        return locales;
      }, [] as string[]);

      (config.localization as SanitizedLocalizationConfig).locales = (config.localization as LocalizationConfigWithLabels).locales.map((locale) => ({
        ...locale,
        toString: () => locale.code,
      }));
    }
  }


  configWithDefaults.collections.push(getPreferencesCollection(configWithDefaults));
  configWithDefaults.collections.push(migrationsCollection);

  config.collections = config.collections.map((collection) => sanitizeCollection(configWithDefaults, collection));
  checkDuplicateCollections(config.collections);

  if (config.globals.length > 0) {
    config.globals = sanitizeGlobals(config.collections, config.globals);
  }

  if (typeof config.serverURL === 'undefined') {
    config.serverURL = '';
  }

  if (config.serverURL !== '') {
    config.csrf.push(config.serverURL);
  }

  return config as SanitizedConfig;
};
