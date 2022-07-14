import { hello } from '.';

describe('hello function', () => {
  it('should include the passed in name', () => {
    const name = 'jimbo';
    expect(hello(name)).toMatch(name);
  });
});
