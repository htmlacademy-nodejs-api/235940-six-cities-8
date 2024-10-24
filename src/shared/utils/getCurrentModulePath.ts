import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const getCurrentModulePath = () => dirname(fileURLToPath(import.meta.url));
