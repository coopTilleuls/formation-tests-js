export const translateHelper = {
  /**
   * Get a translation from a catalog regarding the number of items
   *
   * @param catalog JSON  translation's catalog
   * @param locale string locale to watch for
   * @param key string    translation's key
   * @param count number  number of items (to look for plurals)
   * @returns string
   * @throws Error
   * @example:
   *  const translation = require('./translation.json');
   *  translateHelper.translate(translation, 'fr', 'counter', 12);
   */
  translate: (catalog = {}, locale = 'fr', key = '', count = 0) => {
    const translations = catalog[locale]?.[key];

    // If we can't find translation, we throw
    if (!translations) {
      throw new Error("Chaîne de traduction manquante.");
    }

    const values = Object.entries(translations).reverse();
    // the default value is the last one
    let value = values[0][1];

    // if there's only one translation, we use it ignoring count parameter
      values.forEach(([key, label]) => {
        if (+key >= count) {
          value = label;
        }
      });

    return translateHelper.translateReplacement(value, count);
  },


  /**
   * Replace {count} pattern in translated string
   *
   * @param value string  translated string
   * @param count number  number of items
   * @returns string
   */
  translateReplacement: (value = '', count = 0) => {
    return value.replace(/\{count\}/g, count);
  }
};
