import {translateHelper} from '../translateHelper';
import translation from '../translation.json';

describe('translate function', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    translateHelper.translateReplacement = jest.fn()
      .mockImplementation((value, count) => value.replace(/\{count\}/g, count));
  });

  test('should throw if catalog did not contain translation\'s key', () => {
    expect(() => translateHelper.translate()).toThrowError('Chaîne de traduction manquante.');
    expect(() => translateHelper.translate(translation, 'en')).toThrowError('Chaîne de traduction manquante.');
    expect(() => translateHelper.translate(translation, 'fr', 'foo')).toThrowError('Chaîne de traduction manquante.');
  });

  test('should return lone value in case of unique translation ignoring the count', () => {
    const customTranlsation = {
      "fr" : {
        "counter": {
          "10": "{count} produits",
        }
      }
    }

    expect(translateHelper.translate(customTranlsation, 'fr', 'counter', 2)).toBe('2 produits');
    expect(translateHelper.translate(customTranlsation, 'fr', 'counter', 20)).toBe('20 produits');
    expect(translateHelper.translateReplacement).toHaveBeenCalledTimes(2);
  });

  test('should return value regarding count', () => {
    translateHelper.translateReplacement = jest.fn()
      .mockImplementation((value, count) => value.replace(/\{count\}/g, count));

    expect(translateHelper.translate(translation, 'fr', 'counter', -1)).toBe('Rien');
    expect(translateHelper.translate(translation, 'fr', 'counter', 1)).toBe('1 produit');
    expect(translateHelper.translate(translation, 'fr', 'counter', 2)).toBe('2 produits');
    expect(translateHelper.translate(translation, 'fr', 'counter', 20)).toBe('trop de produits');
  });

});

describe('translateReplacement function', () => {

  test('should return value if pattern is not found', () => {
    expect(translateHelper.translateReplacement('trop de produits', 12)).toBe('trop de produits');
  });

  test('should replace {count} if pattern is found', () => {
    expect(translateHelper.translateReplacement('{count} produits', 12)).toBe('12 produits');
  });

  test('should replace {count} each time pattern is found', () => {
    expect(translateHelper.translateReplacement('{count} produits : {count}', 12)).toBe('12 produits : 12');
  });

});
