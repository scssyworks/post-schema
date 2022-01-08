export type SchemaAny = {
  name: string;
  type: string;
};

export interface SchemaObjectString extends SchemaAny {
  type: 'string';
  valuetype?:
    | 'name'
    | 'fullname'
    | 'lastname'
    | 'place'
    | 'animal'
    | 'thing'
    | 'random';
  wordcount?: number;
}

export interface SchemaObjectNumber extends SchemaAny {
  type: 'number';
  valuetype?: 'currency' | 'random';
  min?: number;
  max?: number;
  toFixed?: number;
  symbol?: 'string';
}

export interface SchemaObjectBool extends SchemaAny {
  type: 'boolean' | 'true' | 'false';
}

export interface SchemaObjectNull extends SchemaAny {
  type: 'null';
}

export type SchemaMapKey = string | SchemaObjectKeys;
export type SchemaListItem =
  | string
  | number
  | boolean
  | null
  | Omit<SchemaObjectKeys, 'name'>;

export interface SchemaObjectMap extends SchemaAny {
  type: 'object';
  keys: SchemaMapKey[];
}

export type SchemaObjectKeys =
  | SchemaObjectString
  | SchemaObjectNumber
  | SchemaObjectBool
  | SchemaObjectNull
  | SchemaObjectMap
  | SchemaAny;

export type SchemaList = {
  type: 'list';
  items: SchemaListItem;
  count: number;
};

export type Schema = Omit<SchemaObjectMap | SchemaList, 'name'>;
