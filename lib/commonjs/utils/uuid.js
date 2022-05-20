"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCodeVerifier = generateCodeVerifier;
exports.createUUID = createUUID;
exports.generatePkceChallenge = generatePkceChallenge;

var _base64Js = require("base64-js");

var _jsSha = require("js-sha256");

/* eslint-disable no-useless-escape */
function generateRandomString(len, alphabet) {
  const randomData = generateRandomData(len);
  const chars = [...Array(len)].map((_, idx) => alphabet.charCodeAt(randomData[idx] % alphabet.length));
  return String.fromCharCode.apply(null, chars);
}

function generateRandomData(len) {
  return [...Array(len)].map(() => Math.floor(256 * Math.random()));
}

function generateCodeVerifier(len) {
  return generateRandomString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

const hexDigits = '0123456789abcdef';

function createUUID() {
  const s = generateRandomString(36, hexDigits).split('');
  s[14] = '4'; // eslint-disable-next-line no-bitwise

  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}

function generatePkceChallenge(pkceMethod, codeVerifier) {
  switch (pkceMethod) {
    // The use of the "plain" method is considered insecure and therefore not supported.
    case 'S256':
      // hash codeVerifier, then encode as url-safe base64 without padding
      const hashBytes = new Uint8Array(_jsSha.sha256.arrayBuffer(codeVerifier));
      const encodedHash = (0, _base64Js.fromByteArray)(hashBytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
      return encodedHash;

    default:
      throw 'Invalid value for pkceMethod';
  }
}
//# sourceMappingURL=uuid.js.map