// jest.setup.js
import { TextEncoder, TextDecoder } from 'util';

// Fix for whatwg-url issues with MongoDB
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Set test timeout
jest.setTimeout(30000);