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
 * @interface CreateMessageDto
 */
export interface CreateMessageDto {
    /**
     * 
     * @type {string}
     * @memberof CreateMessageDto
     */
    '_id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateMessageDto
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof CreateMessageDto
     */
    'message': string;
    /**
     * 
     * @type {string}
     * @memberof CreateMessageDto
     */
    'createdAt': string;
}
/**
 * 
 * @export
 * @interface CreateUserDto
 */
export interface CreateUserDto {
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'provider': string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'providerId': string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'displayName': string;
    /**
     * 
     * @type {Array<PhotosDto>}
     * @memberof CreateUserDto
     */
    'photos': Array<PhotosDto>;
}
/**
 * 
 * @export
 * @interface PhotosDto
 */
export interface PhotosDto {
    /**
     * 
     * @type {string}
     * @memberof PhotosDto
     */
    'value': string;
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jwtAuthControllerVerify: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/auth/verify`;
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
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jwtAuthControllerVerify(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.jwtAuthControllerVerify(options);
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
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jwtAuthControllerVerify(options?: any): AxiosPromise<boolean> {
            return localVarFp.jwtAuthControllerVerify(options).then((request) => request(axios, basePath));
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public jwtAuthControllerVerify(options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).jwtAuthControllerVerify(options).then((request) => request(this.axios, this.basePath));
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
         * @param {CreateMessageDto} createMessageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerCreateMessage: async (createMessageDto: CreateMessageDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createMessageDto' is not null or undefined
            assertParamExists('messageControllerCreateMessage', 'createMessageDto', createMessageDto)
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
            localVarRequestOptions.data = serializeDataIfNeeded(createMessageDto, localVarRequestOptions, configuration)

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
         * @param {number} [page] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerFindAll: async (page?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
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
         * @param {CreateMessageDto} createMessageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerUpdateMessage: async (id: string, createMessageDto: CreateMessageDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('messageControllerUpdateMessage', 'id', id)
            // verify required parameter 'createMessageDto' is not null or undefined
            assertParamExists('messageControllerUpdateMessage', 'createMessageDto', createMessageDto)
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
            localVarRequestOptions.data = serializeDataIfNeeded(createMessageDto, localVarRequestOptions, configuration)

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
         * @param {CreateMessageDto} createMessageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerCreateMessage(createMessageDto: CreateMessageDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateMessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerCreateMessage(createMessageDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerDeleteMessage(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateMessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerDeleteMessage(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [page] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerFindAll(page?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateMessageDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerFindAll(page, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} id 
         * @param {CreateMessageDto} createMessageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async messageControllerUpdateMessage(id: string, createMessageDto: CreateMessageDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateMessageDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.messageControllerUpdateMessage(id, createMessageDto, options);
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
         * @param {CreateMessageDto} createMessageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerCreateMessage(createMessageDto: CreateMessageDto, options?: any): AxiosPromise<CreateMessageDto> {
            return localVarFp.messageControllerCreateMessage(createMessageDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerDeleteMessage(id: string, options?: any): AxiosPromise<CreateMessageDto> {
            return localVarFp.messageControllerDeleteMessage(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [page] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerFindAll(page?: number, limit?: number, options?: any): AxiosPromise<Array<CreateMessageDto>> {
            return localVarFp.messageControllerFindAll(page, limit, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {CreateMessageDto} createMessageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        messageControllerUpdateMessage(id: string, createMessageDto: CreateMessageDto, options?: any): AxiosPromise<CreateMessageDto> {
            return localVarFp.messageControllerUpdateMessage(id, createMessageDto, options).then((request) => request(axios, basePath));
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
     * @param {CreateMessageDto} createMessageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerCreateMessage(createMessageDto: CreateMessageDto, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerCreateMessage(createMessageDto, options).then((request) => request(this.axios, this.basePath));
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
     * @param {number} [page] 
     * @param {number} [limit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerFindAll(page?: number, limit?: number, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerFindAll(page, limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {CreateMessageDto} createMessageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageApi
     */
    public messageControllerUpdateMessage(id: string, createMessageDto: CreateMessageDto, options?: AxiosRequestConfig) {
        return MessageApiFp(this.configuration).messageControllerUpdateMessage(id, createMessageDto, options).then((request) => request(this.axios, this.basePath));
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
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFind: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('userControllerFind', 'id', id)
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
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerFind(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateUserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerFind(id, options);
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
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerFind(id: string, options?: any): AxiosPromise<CreateUserDto> {
            return localVarFp.userControllerFind(id, options).then((request) => request(axios, basePath));
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
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerFind(id: string, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerFind(id, options).then((request) => request(this.axios, this.basePath));
    }
}


