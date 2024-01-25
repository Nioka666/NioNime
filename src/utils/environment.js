import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

export const isENV = dotenv.config({ path: envPath }).parsed;
export const DB_PASS = isENV.VITE_DB_PASS;
export const ANIFY_URL = isENV.VITE_ANIFY_URL;