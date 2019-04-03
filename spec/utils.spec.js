const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const {
  reformatTimestamp,
  changeKeyName,
  convertData,
} = require('../utils/utils');

describe('reformatTimestamp', () => {
  it('', () => {
    const input = [];
    const result = [];
    expect(reformatTimestamp(input)).to.eql(result);
  });
  it('', () => {
    const input = [{ created_at: 1471522072389 }];
    const result = [{ created_at: 'Thu, 18 Aug 2016 12:07:52 GMT' }];
    expect(reformatTimestamp(input)).to.eql(result);
  });
});

describe('changeKeyName', () => {
  it('', () => {
    const dataArray = [{ old_key: 42 }];
    const newKeyName = 'new_key';
    const oldKeyName = 'old_key';
    expect(changeKeyName(dataArray, oldKeyName, newKeyName)).to.eql([
      { new_key: 42 },
    ]);
  });
});

describe.only('convertData', () => {
  it('', () => {
    const arr1 = [];
    const key1 = 'keyA';
    const arr2 = [];
    const key2 = 'keyB';
    const result = [];
    expect(convertData(arr1, key1, arr2, key2)).to.eql(result);
  });
  it('', () => {
    const arr1 = [{ keyA: 42 }];
    const key1 = 'keyA';
    const arr2 = [{ keyA: 42, keyB: 'hello' }];
    const key2 = 'keyB';
    const result = [{ keyB: 'hello' }];
    expect(convertData(arr1, key1, arr2, key2)).to.eql(result);
  });
  it('', () => {
    const arr1 = [{ keyA: 42, keyC: 'world' }];
    const key1 = 'keyA';
    const arr2 = [{ keyA: 42, keyB: 'hello' }];
    const key2 = 'keyB';
    const result = [{ keyB: 'hello', keyC: 'world' }];
    expect(convertData(arr1, key1, arr2, key2)).to.eql(result);
  });
});
