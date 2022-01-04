# Post Schema

Post schema is a mock data generator for Node

## Install

```sh
npm i post-schema
```

## Usage

```js
const postSchema = require('post-schema');
console.log(
  postSchema.mock({
    // ... schema definition
  })
);
```

## Examples

```js
console.log(
  postSchema.mock({
    type: 'object', // The initial type always has to be object or a list for it to a valid object/JSON
    keys: ['name', 'place', 'animal', 'thing'],
  })
);

/*
Result:
 {
     name: 'lorem',
     place: 'ipsum',
     animal: 'dolor',
     thing: 'sit'
 }
*/
```

```js
console.log(
  postSchema.mock({
    type: 'object', // The initial type always has to be object or a list for it to a valid object/JSON
    keys: [
      {
        type: 'string',
        name: 'name',
        valuetype: 'name',
      },
      {
        type: 'string',
        name: 'fullName',
        valuetype: 'fullname',
      },
      {
        type: 'number',
        name: 'accountNumber',
      },
      {
        type: 'number',
        name: 'balance',
        valuetype: 'currency',
      },
      {
        type: 'boolean',
        name: 'status',
      },
    ],
  })
);

/*
Result:
 {
     name: 'John',
     fullName: 'Adam Sanders',
     accountNumber: 234,
     balance: '$765',
     status: true
 }
*/
```

```js
console.log(
  postSchema.mock({
    type: 'list', // The initial type always has to be object or a list for it to a valid object/JSON
    items: {
      type: 'object',
      keys: [
        {
          name: 'fullName',
          type: 'string',
          valuetype: 'fullname',
        },
        {
          name: 'isValid',
          type: 'true',
        },
        {
          name: 'location',
          type: 'string',
          valuetype: 'place',
        },
        {
          name: 'status',
          type: 'boolean, null',
        },
      ],
    },
  })
);

/*
Result:
 [
     {
         fullName: 'John Doe',
         isValid: true,
         location: 'California',
         status: true
     },
     {
         fullName: 'Adam Sanders',
         isValid: true,
         location: 'Kolkata',
         status: null
     },
     ... 3 more such objects (By default 5 items is default unless "count" parameter is specified)
 ]
*/
```

For feature requests please raise a new issue under issues section. This project is still unreleased but good enough for development purposes so feel free to use it.
