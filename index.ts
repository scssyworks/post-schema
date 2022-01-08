import parser from './src/lib/parser';
import { Schema } from './src/types';

const postSchema = {
  mock(schema: Schema): any {
    return parser(schema);
  },
};

(postSchema as any).default = postSchema;

export = postSchema;
