// Object schema

const objectSchema = {
  type: 'object',
  keys: [
    'test', // Generate a key named 'test' with a random string,
    {
      type: 'string',
      name: 'str', // Generates a key named 'str' with a random string,
      valuetype: 'name', // other options: fullname, place, animal, thing, random. Default's to 'random'
    },
    {
      type: 'number', // other options: 'float'
      name: 'num', // Generates a key named 'num' with a random number
      valuetype: 'random', // other options: currency. With currency option we can provide the "currencytype" option which default's to $. The value is automatically formatted to string for currency type
    },
    {
      type: 'boolean', // other options: 'true', 'false' to fix the value to always stay as true or false
      name: 'flag', // Generates a key named 'flag' with a random "true" or "false" value
    },
    {
      type: 'null',
      name: 'data', // Generates a key named 'data' with null value
    },
    {
      type: 'object',
      name: 'ob',
      keys: [], // If undefined or empty then an empty object is created
    },
    {
      type: 'list',
      name: 'list', // An array named list is created
      count: 10, // Default's to 5
      // items: 'string', // 5 random strings
      // items: { type: 'string', valuetype: 'name' }, // Cannot provide key "name" for items type since the values are indexed. The name property will simply be ignored
      items: { type: 'object', keys: [] }, // Keys has to be fixed for all values for data consistency
      // items: { type: 'list', count: 10, items: 'number' },
    },
  ],
};

module.exports = {
  objectSchema,
};
