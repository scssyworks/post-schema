import {
  Schema,
  SchemaList,
  SchemaListItem,
  SchemaObjectKeys,
  SchemaObjectMap,
  SchemaObjectNumber,
  SchemaObjectString,
} from '../types';
import values from './values';

function resolveString(key: SchemaObjectString) {
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

function handleValue(key: SchemaObjectKeys): SchemaListItem {
  key.type = key.type.toLowerCase();
  if (key.type === 'string') {
    // Check value type
    return resolveString(key as SchemaObjectString);
  }
  if (key.type === 'number') {
    if ((key as SchemaObjectNumber).valuetype === 'currency') {
      return values.getCurrency(
        (key as SchemaObjectNumber).min,
        (key as SchemaObjectNumber).max,
        (key as SchemaObjectNumber).symbol
      );
    }
    return values.getNumber(
      (key as SchemaObjectNumber).min,
      (key as SchemaObjectNumber).max
    );
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
    return parseNext(key as Schema);
  }
  return '';
}

function handleItems(item: SchemaListItem) {
  if (item && typeof item === 'string') {
    item = item.toLowerCase();
    if (item === 'string') {
      return values.getString();
    }
    if (item === 'number') {
      return values.getNumber();
    }
    if (item === 'boolean') {
      return values.getBool();
    }
    if (item === 'null') {
      return null;
    }
  }
  if (item && typeof item === 'object' && typeof item.type === 'string') {
    return handleValue(item as SchemaObjectKeys);
  } else {
    throw new Error('Invalid items "type" for list');
  }
}

function parseNext(schema: Schema, next?: any) {
  if (schema.type === 'object') {
    next = typeof next === 'undefined' ? {} : next;
    const keys = (schema as SchemaObjectMap).keys || [];
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
      index <
      (typeof (schema as SchemaList).count === 'number'
        ? (schema as SchemaList).count
        : 5);
      index += 1
    ) {
      next.push(handleItems((schema as SchemaList).items));
    }
  }
  return next;
}

export default function parser(schema: Schema) {
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
}
