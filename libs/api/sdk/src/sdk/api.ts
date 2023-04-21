/* tslint:disable */
/* eslint-disable */
/**
 * ChatApp
 * The chat app API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface LoginDto
 */
export interface LoginDto {
    /**
     * 
     * @type {string}
     * @memberof LoginDto
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof LoginDto
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface MessageDto
 */
export interface MessageDto {
    /**
     * 
     * @type {string}
     * @memberof MessageDto
     */
    '_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof MessageDto
     */
    'chatId': string;
    /**
     * 
     * @type {string}
     * @memberof MessageDto
     */
    'userId': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof MessageDto
     */
    'seenBy': Array<string>;
    /**
     * 
     * @type {string}
     * @memberof MessageDto
     */
    'sender': string;
    /**
     * 
     * @type {string}
     * @memberof MessageDto
     */
    'message': string;
}
/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    '_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    'password': string;
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {LoginDto} loginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin: async (loginDto: LoginDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginDto' is not null or undefined
            assertParamExists('authControllerLogin', 'loginDto', loginDto)
            const localVarPath = `/api/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {LoginDto} loginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLogin(loginDto: LoginDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerLogin(loginDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {LoginDto} loginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin(loginDto: LoginDto, options?: any): AxiosPromise<void> {
            return localVarFp.authControllerLogin(loginDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {LoginDto} loginDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerLogin(loginDto: LoginDto, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerLogin(loginDto, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * MessageApi - axios parameter creator
 * @export
 */
export const MessageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerCreateMessage: async (messageDto: MessageDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageDto' is not null or undefined
            assertParamExists('messageControllerCreateMessage', 'messageDto', messageDto)
            const localVarPath = `/api/message`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(messageDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerDeleteMessage: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('messageControllerDeleteMessage', 'id', id)
            const localVarPath = `/api/message/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerFindAll: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('messageControllerFindAll', 'userId', userId)
            const localVarPath = `/api/message`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (userId !== undefined) {
                localVarQueryParameter['userId'] = userId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerUpdateMessage: async (id: string, messageDto: MessageDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('messageControllerUpdateMessage', 'id', id)
            // verify required parameter 'messageDto' is not null or undefined
            assertParamExists('messageControllerUpdateMessage', 'messageDto', messageDto)
            const localVarPath = `/api/message/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(messageDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MessageApi - functional programming interface
 * @export
 */
export const MessageApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MessageApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerCreateMessage(messageDto: MessageDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerCreateMessage(messageDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerDeleteMessage(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerDeleteMessage(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerFindAll(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MessageDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerFindAll(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerUpdateMessage(id: string, messageDto: MessageDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerUpdateMessage(id, messageDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MessageApi - factory interface
 * @export
 */
export const MessageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MessageApiFp(configuration)
    return {
        /**
         * 
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerCreateMessage(messageDto: MessageDto, options?: any): AxiosPromise<MessageDto> {
            return localVarFp.messageControllerCreateMessage(messageDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerDeleteMessage(id: string, options?: any): AxiosPromise<MessageDto> {
            return localVarFp.messageControllerDeleteMessage(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerFindAll(userId: string, options?: any): AxiosPromise<Array<MessageDto>> {
            return localVarFp.messageControllerFindAll(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerUpdateMessage(id: string, messageDto: MessageDto, options?: any): AxiosPromise<MessageDto> {
            return localVarFp.messageControllerUpdateMessage(id, messageDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MessageApi - object-oriented interface
 * @export
 * @class MessageApi
 * @extends {BaseAPI}
 */
export class MessageApi extends BaseAPI {
    /**
     * 
     * @param {MessageDto} messageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerCreateMessage(messageDto: MessageDto, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerCreateMessage(messageDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerDeleteMessage(id: string, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerDeleteMessage(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerFindAll(userId: string, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerFindAll(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {MessageDto} messageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerUpdateMessage(id: string, messageDto: MessageDto, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerUpdateMessage(id, messageDto, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {UserDto} userDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerCreate: async (userDto: UserDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userDto' is not null or undefined
            assertParamExists('userControllerCreate', 'userDto', userDto)
            const localVarPath = `/api/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerDelete: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerDelete', 'id', id)
            const localVarPath = `/api/user/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFindOne: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerFindOne', 'id', id)
            const localVarPath = `/api/user/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {UserDto} userDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerUpdate: async (id: string, userDto: UserDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerUpdate', 'id', id)
            // verify required parameter 'userDto' is not null or undefined
            assertParamExists('userControllerUpdate', 'userDto', userDto)
            const localVarPath = `/api/user/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {UserDto} userDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerCreate(userDto: UserDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerCreate(userDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerDelete(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerDelete(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerFindOne(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UserDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerFindOne(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {UserDto} userDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerUpdate(id: string, userDto: UserDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerUpdate(id, userDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * 
         * @param {UserDto} userDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerCreate(userDto: UserDto, options?: any): AxiosPromise<UserDto> {
            return localVarFp.userControllerCreate(userDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerDelete(id: string, options?: any): AxiosPromise<UserDto> {
            return localVarFp.userControllerDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFindOne(id: string, options?: any): AxiosPromise<Array<UserDto>> {
            return localVarFp.userControllerFindOne(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {UserDto} userDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerUpdate(id: string, userDto: UserDto, options?: any): AxiosPromise<UserDto> {
            return localVarFp.userControllerUpdate(id, userDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @param {UserDto} userDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerCreate(userDto: UserDto, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerCreate(userDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerDelete(id: string, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerDelete(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerFindOne(id: string, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerFindOne(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {UserDto} userDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerUpdate(id: string, userDto: UserDto, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerUpdate(id, userDto, options).then((request) => request(this.axios, this.basePath));
    }
}


