import convict from 'convict';
import validator from 'convict-format-with-validator';
convict.addFormats(validator);

import { IRestSchema } from './types/rest-schema.interface.js';

export const configRestSchema = convict<IRestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
});
