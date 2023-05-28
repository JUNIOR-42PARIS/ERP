import { emptyStringToNull, objectEmptyStringToNull } from '@/utils/string';
import { describe, expect, it } from 'vitest';

describe('emptyStringToNull', () => {
  it('should transform empty string to undefined', () => {
    expect(emptyStringToNull('')).toBe(undefined);
    expect(emptyStringToNull('')).toBe(undefined);
    expect(emptyStringToNull('   ')).toBe(undefined);
  });

  it('should not transform string to undefined', () => {
    expect(emptyStringToNull('test')).toBe('test');
    expect(emptyStringToNull(' test ')).toBe(' test ');
  });

  it('should not transform function to undefined', () => {
    const test = () => {};
    expect(emptyStringToNull(test)).toBe(test);
  });

  it('should not transform object to undefined', () => {
    const test = {};
    expect(emptyStringToNull(test)).toBe(test);
  });
});

describe('objectEmptyStringToNull', () => {
  it('should transform empty string of object in object', () => {
    const obj = {
      test: {},
      string: 'test',
      undefined: ''
    };
    const objCorrect = {
      test: {},
      string: 'test',
      undefined: undefined
    };
    expect(objectEmptyStringToNull(obj)).toStrictEqual(objCorrect);
  });
});
