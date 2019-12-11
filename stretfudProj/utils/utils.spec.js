const { formatLocation } = require('./utils');

describe('formatLocation', () => {
  it('given a lat and long object numbers returns a string', () => {
    const output = formatLocation({});
    expect(typeof output).toBe('string');
  });
  it('given a lat and long obj returns with the values of the keys and returns them in a string', () => {
    const output = formatLocation({ latitude: '53.1,', longitude: '-1.54,' });
    expect(output).toBe('53.1, -1.54');
  });
});
