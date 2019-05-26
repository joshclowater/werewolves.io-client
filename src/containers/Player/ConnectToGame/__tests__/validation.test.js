import validate from '../validation';

describe('with valid values', () => {
  let values;
  beforeEach(() => {
    values = {
      gameId: '12345',
      name: 'mock name'
    };
  });
  it('returns empty object', () => {
    expect(validate(values)).toEqual({});
  });
});

describe('with no values', () => {
  let values;
  beforeEach(() => {
    values = {};
  });
  it('returns non empty errors', () => {
    expect(validate(values)).toMatchSnapshot();
  });
});

describe('with invalid length', () => {
  let values;
  beforeEach(() => {
    values = {
      gameId: '1234',
      name: '1234567890123'
    };
  });
  it('returns invalid length errors', () => {
    expect(validate(values)).toMatchSnapshot();
  });
});
