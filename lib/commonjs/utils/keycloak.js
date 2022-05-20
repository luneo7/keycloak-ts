"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRealmUrl = getRealmUrl;
exports.setupOidcEndoints = setupOidcEndoints;
exports.decodeToken = decodeToken;
exports.parseCallbackParams = parseCallbackParams;
exports.isKeycloakConfig = isKeycloakConfig;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _url = require("./url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => _objectSpread(_objectSpread({}, obj), {}, {
    [key]: val
  }), {});
}

function getRealmUrl(realm, authServerUrl) {
  if (typeof authServerUrl === 'undefined') {
    return undefined;
  }

  if (authServerUrl.charAt(authServerUrl.length - 1) === '/') {
    return authServerUrl + 'realms/' + encodeURIComponent(realm);
  } else {
    return authServerUrl + '/realms/' + encodeURIComponent(realm);
  }
}

function setupOidcEndoints({
  oidcConfiguration,
  realm,
  authServerUrl
}) {
  if (!oidcConfiguration) {
    if (!realm) {
      throw new Error('Missing realm');
    }

    return {
      authorize: function authorize() {
        return getRealmUrl(realm, authServerUrl) + '/protocol/openid-connect/auth';
      },
      token: function token() {
        return getRealmUrl(realm, authServerUrl) + '/protocol/openid-connect/token';
      },
      logout: function logout() {
        return getRealmUrl(realm, authServerUrl) + '/protocol/openid-connect/logout';
      },
      register: function register() {
        return getRealmUrl(realm, authServerUrl) + '/protocol/openid-connect/registrations';
      },
      userinfo: function userinfo() {
        return getRealmUrl(realm, authServerUrl) + '/protocol/openid-connect/userinfo';
      }
    };
  }

  return {
    authorize: function authorize() {
      return oidcConfiguration.authorization_endpoint;
    },
    token: function token() {
      return oidcConfiguration.token_endpoint;
    },
    logout: function logout() {
      if (!oidcConfiguration.end_session_endpoint) {
        throw 'Not supported by the OIDC server';
      }

      return oidcConfiguration.end_session_endpoint;
    },
    register: function register() {
      throw 'Redirection to "Register user" page not supported in standard OIDC mode';
    },
    userinfo: function userinfo() {
      if (!oidcConfiguration.userinfo_endpoint) {
        throw 'Not supported by the OIDC server';
      }

      return oidcConfiguration.userinfo_endpoint;
    }
  };
}

function decodeToken(str) {
  return (0, _jwtDecode.default)(str);
}

function parseCallbackParams(paramsString, supportedParams) {
  const params = (0, _url.extractQuerystringParameters)(paramsString);
  const [otherParams, oAuthParams] = Object.keys(params).reduce(([oParams, oauthParams], key) => {
    if (supportedParams.includes(key)) {
      oauthParams.set(key, params[key]);
    } else {
      oParams.set(key, params[key]);
    }

    return [oParams, oauthParams];
  }, [new Map(), new Map()]);
  return {
    paramsString: (0, _url.formatQuerystringParameters)(otherParams),
    oauthParams: fromEntries(oAuthParams.entries())
  };
}

function isKeycloakConfig(config) {
  return !!config && typeof config !== 'string';
}
//# sourceMappingURL=keycloak.js.map