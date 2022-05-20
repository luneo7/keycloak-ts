/// <reference types="node" />
import type { KeycloakConfig, KeycloakEndpoints, KeycloakError, KeycloakFlow, KeycloakInitOptions, KeycloakInstance, KeycloakLoginOptions, KeycloakLogoutOptions, KeycloakProfile, KeycloakRegisterOptions, KeycloakResourceAccess, KeycloakResponseMode, KeycloakResponseType, KeycloakRoles, KeycloakTokenParsed, OAuthResponse } from './types';
/**
 * A client for the Keycloak authentication server.
 * @see {@link https://keycloak.gitbooks.io/securing-client-applications-guide/content/topics/oidc/javascript-adapter.html|Keycloak JS adapter documentation}
 */
export declare class KeycloakClient implements KeycloakInstance {
    authenticated?: boolean;
    subject?: string;
    responseMode?: KeycloakResponseMode;
    responseType?: KeycloakResponseType;
    flow?: KeycloakFlow;
    realmAccess?: KeycloakRoles;
    resourceAccess?: KeycloakResourceAccess;
    token?: string;
    tokenParsed?: KeycloakTokenParsed;
    refreshToken?: string;
    refreshTokenParsed?: KeycloakTokenParsed;
    idToken?: string;
    idTokenParsed?: KeycloakTokenParsed;
    timeSkew?: number;
    loginRequired?: boolean;
    authServerUrl?: string;
    realm?: string;
    clientId?: string;
    redirectUri?: string;
    profile?: KeycloakProfile;
    userInfo?: unknown;
    enableLogging?: boolean;
    tokenTimeoutHandle?: NodeJS.Timeout | null;
    endpoints?: KeycloakEndpoints;
    clientConfig: KeycloakConfig;
    private adapter?;
    private callbackStorage?;
    private logInfo;
    private logWarn;
    private refreshQueue;
    private useNonce?;
    private pkceMethod?;
    constructor(clientConfig: KeycloakConfig);
    /**
     * Called to initialize the adapter.
     * @param initOptions Initialization options.
     * @returns A promise to set functions to be invoked on success or error.
     */
    init(initOptions: KeycloakInitOptions): Promise<boolean>;
    /**
     * Redirects to login form.
     * @param options Login options.
     */
    login(options?: KeycloakLoginOptions): Promise<void>;
    /**
     * Redirects to logout.
     * @param options Logout options.
     */
    logout(options?: KeycloakLogoutOptions): Promise<void>;
    /**
     * Redirects to registration form.
     * @param options The options used for the registration.
     */
    register(options?: KeycloakRegisterOptions): Promise<void>;
    /**
     * Redirects to the Account Management Console.
     */
    accountManagement(): Promise<void>;
    /**
     * Returns the URL to login form.
     * @param options Supports same options as Keycloak#login.
     */
    createLoginUrl(options?: KeycloakLoginOptions): string;
    /**
     * Returns the URL to logout the user.
     * @param options Logout options.
     */
    createLogoutUrl(options?: KeycloakLogoutOptions): string;
    /**
     * Returns the URL to registration page.
     * @param options The options used for creating the registration URL.
     */
    createRegisterUrl(options?: KeycloakRegisterOptions): string;
    /**
     * Returns the URL to the Account Management Console.
     */
    createAccountUrl(): string;
    /**
     * Returns true if the token has less than `minValidity` seconds left before
     * it expires.
     * @param minValidity If not specified, `0` is used.
     */
    isTokenExpired(minValidity?: number): boolean;
    private runUpdateToken;
    /**
     * If the token expires within `minValidity` seconds, the token is refreshed.
     * If the session status iframe is enabled, the session status is also
     * checked.
     * @returns A promise to set functions that can be invoked if the token is
     *          still valid, or if the token is no longer valid.
     * @example
     * ```js
     * keycloak.updateToken(5).then(function(refreshed) {
     *   if (refreshed) {
     *     alert('Token was successfully refreshed');
     *   } else {
     *     alert('Token is still valid');
     *   }
     * }).catch(function() {
     *   alert('Failed to refresh the token, or the session has expired');
     * });
     */
    updateToken(minValidity?: number): Promise<boolean>;
    /**
     * Clears authentication state, including tokens. This can be useful if
     * the application has detected the session was expired, for example if
     * updating token fails. Invoking this results in Keycloak#onAuthLogout
     * callback listener being invoked.
     */
    clearToken(): void;
    /**
     * Returns true if the token has the given realm role.
     * @param role A realm role name.
     */
    hasRealmRole(role: string): boolean;
    /**
     * Returns true if the token has the given role for the resource.
     * @param role A role name.
     * @param resource If not specified, `clientId` is used.
     */
    hasResourceRole(role: string, resource?: string): boolean;
    /**
     * Loads the user's profile.
     *
     * @returns The current user KeycloakProfile.
     */
    loadUserProfile(): Promise<KeycloakProfile>;
    /**
     * @private Undocumented.
     */
    loadUserInfo(): Promise<unknown>;
    /**
     * Called when the adapter is initialized.
     */
    onReady?(authenticated?: boolean): void;
    /**
     * Called when a user is successfully authenticated.
     */
    onAuthSuccess?(): void;
    /**
     * Called if there was an error during authentication.
     */
    onAuthError?(errorData: KeycloakError): void;
    /**
     * Called when the token is refreshed.
     */
    onAuthRefreshSuccess?(): void;
    /**
     * Called if there was an error while trying to refresh the token.
     */
    onAuthRefreshError?(): void;
    /**
     * Called if the user is logged out (will only be called if the session
     * status iframe is enabled, or in Cordova mode).
     */
    onAuthLogout?(): void;
    /**
     * Called when the access token is expired. If a refresh token is available
     * the token can be refreshed with Keycloak#updateToken, or in cases where
     * it's not (ie. with implicit flow) you can redirect to login screen to
     * obtain a new access token.
     */
    onTokenExpired?(): void;
    /**
     * Called when a AIA has been requested by the application.
     */
    onActionUpdate?(status: 'success' | 'cancelled' | 'error'): void;
    /**
     * @private Undocumented.
     */
    processCallback(oauth: OAuthResponse): Promise<void>;
    private authSuccess;
    /**
     * @private Undocumented.
     */
    parseCallback(url: string): OAuthResponse;
    private processInit;
    private onLoad;
    private doLogin;
    private setToken;
    private createLogger;
    private loadConfig;
    private parseCallbackUrl;
}
