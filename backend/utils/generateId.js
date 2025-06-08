// utils/generateId.js
import { customAlphabet } from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const shortId = customAlphabet(alphabet, 7);   // 7 chars for shortId
const deleteKeyGen = customAlphabet(alphabet, 10);  // 10 chars for deleteKey

export function generateShortId() {
  return shortId();
}

export function generateDeleteKey() {
  return deleteKeyGen();
}
