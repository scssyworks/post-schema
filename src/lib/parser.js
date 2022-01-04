const values = require('./values');

function resolveString(key) {
  switch (key.valuetype) {
    case 'name':
      return values.getName();
    case 'lastname':
      return values.getLastName();
    case 'fullname':
      return values.getFullName();
    case 'place':
      return values.getPlace();
    case 'animal':
      return values.getAnimal();
    case 'thing':
      return values.getThing();
    case 'random':
    default:
      return values.getString(key.wordcount);
  }
}

function handleValue(key) {
  key.type = key.type.toLowerCase();
  if (key.type === 'string') {
    // Check value type
    return resolveString(key);
  }
  if (key.type === 'number') {
    if (key.valuetype === 'currency') {
      return values.getCurrency(key.min, key.max, key.symbol);
    }
    return values.getNumber(key.min, key.max);
  }
  if (key.type === 'boolean' || ['true', 'false'].includes(key.type)) {
    const fixed = key.type === 'true';
    if (key.type === 'boolean') {
      return values.getBool();
    }
    return values.getBool(fixed);
  }
  if (key.type === 'null') {
    return null;
  }
  if (key.type.includes(',')) {
    // handle multiple type values
    return handleValue(
      values.selectRandom(
        key.type.split(',').map((childKey) => {
          return {
            ...key,
            type: childKey.trim(),
          };
        })
      )
    );
  }
  if (key.type === 'list' || key.type === 'object') {
    return parseNext(key);
  }
}

function handleItems(items) {
  if (items && typeof items === 'string') {
    items = items.toLowerCase();
    if (items === 'string') {
      return values.getString();
    }
    if (items === 'number') {
      return values.getNumber();
    }
    if (items === 'boolean') {
      return values.getBool();
    }
    if (items === 'null') {
      return null;
    }
  }
  if (items && typeof items === 'object' && typeof items.type === 'string') {
    return handleValue(items);
  } else {
    throw new Error('Invalid items "type" for list');
  }
}

function parseNext(schema, next) {
  if (schema.type === 'object') {
    next = typeof next === 'undefined' ? {} : next;
    const keys = schema.keys || [];
    if (Array.isArray(keys) && keys.length) {
      keys.forEach((key) => {
        if (typeof key === 'string') {
          next[key] = values.getString();
        }
        if (typeof key === 'object' && key.name) {
          next[key.name] = handleValue(key);
        }
      });
    }
  }
  if (schema.type === 'list') {
    next = typeof next === 'undefined' ? [] : next;
    for (
      let index = 0;
      index < (typeof schema.count === 'number' ? schema.count : 5);
      index += 1
    ) {
      next.push(handleItems(schema.items));
    }
  }
  return next;
}

module.exports = function parser(schema) {
  if (
    schema &&
    typeof schema === 'object' &&
    schema.type &&
    ['object', 'list'].includes(schema.type)
  ) {
    return parseNext(schema);
  } else {
    throw new Error('Provided schema is invalid');
  }
};
