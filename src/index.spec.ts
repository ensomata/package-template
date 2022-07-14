import { hello } from '.';

describe('hello function', () => {
  it('should say hello', () => {
    const expected = 'Hello';
    expect(hello()).toMatch(expected);
  });
  it('should include the passed in name', () => {
    const name = 'jimbo';
    expect(hello(name)).toMatch(name);
  });
  it('should use the default if no name is provided', () => {
    const expected = 'world';
    expect(hello()).toMatch(expected);
  });
});
