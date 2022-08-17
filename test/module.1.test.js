const moduleA1 = require('../src/module.1');

test('moduleA1 should return "moduleA1"', () => {
  expect(moduleA1()).toEqual('moduleA1');
});
