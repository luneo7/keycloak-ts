import type { CallbackStorage, KeycloakConfig, KeycloakInitOptions, OIDCProviderConfig } from '../types';
export declare function getRealmUrl(realm: string, authServerUrl?: string): string | undefined;
export declare function setupOidcEndoints({ oidcConfiguration, realm, authServerUrl, }: {
    realm?: string;
    authServerUrl?: string;
    oidcConfiguration?: OIDCProviderConfig;
}): {
    authorize: () => string;
    token: () => string;
    logout: () => string;
    register: () => string;
    userinfo: () => string;
};
export declare function decodeToken<T = unknown>(str: string): T;
export interface ParseCallbackParams {
    callbackStorage: CallbackStorage;
    clientOptions: KeycloakInitOptions;
    url: string;
}
export declare function parseCallbackParams(paramsString: string, supportedParams: string[]): {
    paramsString: string;
    oauthParams: {
        [key: string]: unknown;
    };
};
export declare function isKeycloakConfig(config?: string | KeycloakConfig): config is KeycloakConfig;
