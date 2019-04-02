const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const { reformatTimestamp, changeKeyName } = require('../utils/utils');

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
