const parser = require('./src/lib/parser');

module.exports = {
  mock(schema) {
    return parser(schema);
  },
};
