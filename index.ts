import parser from './src/lib/parser';
import { Schema } from './src/types';

export default {
  mock(schema: Schema): any {
    return parser(schema);
  },
};
