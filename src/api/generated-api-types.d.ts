import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Responses {
        /**
         * example:
         * {
         *   "success": true,
         *   "statusCode": 200,
         *   "message": "Success message.",
         *   "data": []
         * }
         */
        export interface $200 {
            /**
             * This is the success status of the login.
             */
            success?: boolean;
            /**
             * This is the status code
             */
            statusCode?: number;
            /**
             * The response data
             */
            message?: string;
            /**
             * The response data
             */
            data?: any[];
        }
        /**
         * example:
         * {
         *   "success": true,
         *   "statusCode": 200,
         *   "message": "Mutation success message.",
         *   "data": []
         * }
         */
        export interface $201 {
            /**
             * This is the success status of the login.
             */
            success?: boolean;
            /**
             * This is the status code
             */
            statusCode?: number;
            /**
             * The response data
             */
            message?: string;
            /**
             * The response data
             */
            data?: any[];
        }
        /**
         * example:
         * {
         *   "success": false,
         *   "statusCode": 401,
         *   "message": "Unautorized",
         *   "errors": []
         * }
         */
        export interface $401 {
            /**
             * This is the success status of the login.
             */
            success?: boolean;
            /**
             * This is the status code
             */
            statusCode?: number;
            /**
             * The response data
             */
            message?: string;
            /**
             * The response data
             */
            data?: any[];
        }
        /**
         * example:
         * {
         *   "success": false,
         *   "statusCode": 422,
         *   "message": "Validation errors",
         *   "errors": []
         * }
         */
        export interface $422 {
            /**
             * This is the success status of the login.
             */
            success?: boolean;
            /**
             * This is the status code
             */
            statusCode?: number;
            /**
             * The response data
             */
            message?: string;
            /**
             * The response data
             */
            errors?: any[];
        }
    }
    namespace Schemas {
        /**
         * Login response
         * Login response.
         */
        export interface AuthResponseAttribute {
            /**
             * example:
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            id?: string;
            /**
             * example:
             * Hasib
             */
            name?: string;
            /**
             * example:
             * hasib
             */
            username?: string;
            /**
             * example:
             * hasib@hasib.com
             */
            email?: string;
            /**
             * example:
             * +8801917200115
             */
            phone?: string;
            role?: /**
             * Role response
             * Role response.
             */
            RoleResponseAttribute;
            token?: /**
             * Refresh token response
             * Refresh token response.
             */
            RefreshTokenResponseAttribute;
        }
        /**
         * Coin list response
         * Coin list response.
         */
        export interface CoinListResponseAttribute {
            /**
             * example:
             * d54c5f88-1c4a-47df-ba9c-8362fc2abeb7
             */
            id?: string;
            /**
             * example:
             * Event Coin 1
             */
            name?: string;
            /**
             * example:
             * event-coin1
             */
            coin_id?: string;
            /**
             * example:
             * 120.00
             */
            exchange_rate?: string;
            /**
             * example:
             * 2024-05-01
             */
            start_date?: string; // date
            /**
             * example:
             * 2030-05-01
             */
            validity?: string; // date
            /**
             * example:
             * true
             */
            has_start_date?: boolean;
            /**
             * example:
             * true
             */
            has_end_date?: boolean;
        }
        /**
         * Login request
         * Login request.
         */
        export interface LoginRequestAttribute {
            /**
             * example:
             * admin@admin.com
             */
            email?: string;
            /**
             * example:
             * password
             */
            password?: string;
        }
        /**
         * Transaction request
         * Transaction request
         */
        export interface PaymentRequestAttribute {
            /**
             * example:
             * 1
             */
            coin?: string;
            /**
             * example:
             * hasib
             */
            sender?: string;
            /**
             * example:
             * hasib-01
             */
            receiver?: string;
            /**
             * example:
             * 100
             */
            amount?: number;
        }
        /**
         * Payment response
         * Payment response.
         */
        export interface PaymentResponseAttribute {
            /**
             * example:
             * d54c5f88-1c4a-47df-ba9c-8362fc2abeb7
             */
            transaction_id?: string;
            /**
             * example:
             * COMPLETED
             */
            transaction_status?: string;
        }
        /**
         * Recharge request
         * Recharge request.
         */
        export interface RechargeRequestAttribute {
            /**
             * example:
             * hasib
             */
            receiver?: string;
            /**
             * example:
             * 500
             */
            amount?: number;
        }
        /**
         * Recharge response
         * Recharge response.
         */
        export interface RechargeResponseAttribute {
            /**
             * example:
             * d54c5f88-1c4a-47df-ba9c-8362fc2abeb7
             */
            transaction_id?: string;
            /**
             * example:
             * COMPLETED
             */
            transaction_status?: string;
        }
        /**
         * Refresh token request
         * Refresh token request.
         */
        export interface RefreshTokenRequestAttribute {
            /**
             * example:
             * def502008f8c9501d4544c25059664a3c26d3290d3758da1625735d2ca4f0229cc4d050113ab550daa030284999e2197622bf44c2483aed9e99305b89c7b0f251cb73e6f860edc2dd9bfb47f9649c7f2fb46561b497745c5a37768210726545a71a550fe9336b1971d13b04506b7647b2e865eaef974f6dcf9ca78fdb585ffcde399de609022c6e76fb8cfff68822526a8749b50fd0506123466a2590aab7145f2f6f48e78b0950dbcb888398dbd1122e96ad32f1b5c6ac5cb673fa17a19e2b5029ea89d8d148a15198a9d1e2f70b910c765fdc695b8d79be0a018d768293b089e3aaa6af4f0a429b8d7f2261f69fea6cdd443e64ebc09c46bc6f66306ad9957884f7c8b2e709b003838f114ee30cae223790f11d1234363e7254f6b6c0a69f57d7d4eb809d7a71dda2e3a0bfefed8262d39423ad3ed352a2c3964079926f4d4662ee68184ea5db7148c0cb62bf349dc703c97a78be84087e79c7c4ec8636c849f7fc486244ae1ac8799a7dde7cf1f7dd7955cc9979639a71bdf47b9396e92721ba33977bc3f8e99894035033032e1d3710f42751d5b71760ea76710919700e412b969ec85a5c53b37
             */
            refresh_token?: string;
        }
        /**
         * Refresh token response
         * Refresh token response.
         */
        export interface RefreshTokenResponseAttribute {
            /**
             * example:
             * Bearer
             */
            token_type?: string;
            /**
             * example:
             * 1296000
             */
            expires_in?: number;
            /**
             * example:
             * eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzE2M2Y5MS02MWY3LTRlNDktYmQ4OS0wZTdmZDE2MjliMjEiLCJqdGkiOiJiNzk0OWM5MmExMzEwNjIxZTAwMWU3NzU5YzdjZWQ3ZWZiYTA1MTkzZDQ0MDkxZWFkMTg5ODZmYzExM2UzYmZiMThiMTBhYWZkZjVlNDQzOSIsImlhdCI6MTcxNjIwMjY5MS4zNDEyNzMsIm5iZiI6MTcxNjIwMjY5MS4zNDEyNzUsImV4cCI6MTcxNzQ5ODY5MS4zMzQ3ODcsInN1YiI6IjljMTY2OGUyLWEzYmUtNGViNi05ZGU0LTllODg0ZTI2MzQyZCIsInNjb3BlcyI6W119.vBxne1u6etafNkwngG1H-vQkHerouTJFu5aHFD_tppmpjRbQ4XpUM_MJxLGZnjHMCVxthSAWuyYZ67iSOi6AV9b2hWa6aZwu7FlAze5iQdHR8bA1rDQJtIGMdD0CL6BLY6bQOP2AH1JfWygMv9NOyFFL00M2E9epsN7qz_2FRhthvQVfm3UAo4xP0IPibeOAbaY7-MJVJPTMBEusEHnxti_eEy-VhbKsdAETOMQKi1v7Uxrxf_sm49qXBffJrVOH854bYILgTk0lnCAg4-eSdGBjhOKr9g36UDteJmAEPd4ys4TD5O5UpCYf_ShLlhFbxOswqvTmWUtsneiEVBFjuxhL1RrozgUAxE03VuBRyUh3bMe9bmO8GrrTUVCYX7cCj8j2zQdcy3oyavjNzXdrFgeP6fWsmHHxm5-5QOLwfb6ROln46Bm8c3e6LI3bq4Rk_lIU9Z5BqIGqssU0qJGSzS5FE32ajmn7LP9aFDZOFsqRX_6NXEroBKP8oCiJx5uUaRoTO1zGCDBvH7ewuN4yPGU7D2Q6PeRjyKuMWFK0Rzxz5YI_tkveJBJCj100XVqeRcTIf8JDkfHgPW8yYUv75IanuU5CBpd5Ya0dYfq3XaNciwH3fowOmbCdnixx_fP7IEZkR3f6KPAhUxT98hLqYHLdgVzLX_OyvHecEtk9QIQ
             */
            access_token?: string;
            /**
             * example:
             * def502008f8c9501d4544c25059664a3c26d3290d3758da1625735d2ca4f0229cc4d050113ab550daa030284999e2197622bf44c2483aed9e99305b89c7b0f251cb73e6f860edc2dd9bfb47f9649c7f2fb46561b497745c5a37768210726545a71a550fe9336b1971d13b04506b7647b2e865eaef974f6dcf9ca78fdb585ffcde399de609022c6e76fb8cfff68822526a8749b50fd0506123466a2590aab7145f2f6f48e78b0950dbcb888398dbd1122e96ad32f1b5c6ac5cb673fa17a19e2b5029ea89d8d148a15198a9d1e2f70b910c765fdc695b8d79be0a018d768293b089e3aaa6af4f0a429b8d7f2261f69fea6cdd443e64ebc09c46bc6f66306ad9957884f7c8b2e709b003838f114ee30cae223790f11d1234363e7254f6b6c0a69f57d7d4eb809d7a71dda2e3a0bfefed8262d39423ad3ed352a2c3964079926f4d4662ee68184ea5db7148c0cb62bf349dc703c97a78be84087e79c7c4ec8636c849f7fc486244ae1ac8799a7dde7cf1f7dd7955cc9979639a71bdf47b9396e92721ba33977bc3f8e99894035033032e1d3710f42751d5b71760ea76710919700e412b969ec85a5c53b37
             */
            refresh_token?: string;
        }
        /**
         * Registration request
         * Registration request.
         */
        export interface RegistrationRequestAttribute {
            /**
             * example:
             * Hasib
             */
            name?: string;
            /**
             * example:
             * hasib@hasib.com
             */
            email?: string;
            /**
             * example:
             * hasib
             */
            username?: string;
            /**
             * example:
             * +8801917200115
             */
            phone?: string;
            /**
             * example:
             * Abcd1234
             */
            password?: string;
            /**
             * example:
             * consumer
             */
            role_name?: "merchant" | "consumer";
        }
        /**
         * Role response
         * Role response.
         */
        export interface RoleResponseAttribute {
            /**
             * example:
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            id?: string;
            /**
             * example:
             * consumer
             */
            name?: string;
        }
        /**
         * Transaction response
         * Transaction response.
         */
        export interface TransactionResponse {
            /**
             * example:
             * d54c5f88-1c4a-47df-ba9c-8362fc2abeb7
             */
            tx_id?: string;
            participants?: {
                /**
                 * example:
                 * hasib
                 */
                merchant?: string;
                /**
                 * example:
                 * hasib-01
                 */
                consumer?: string;
            };
            currencies?: {
                /**
                 * example:
                 * 100
                 */
                "1"?: string;
            };
            currency_details?: {
                /**
                 * example:
                 * 100
                 */
                "1"?: string;
            };
            /**
             * example:
             * payment
             */
            group?: string;
            /**
             * example:
             * ctom-payment
             */
            type?: string;
            /**
             * example:
             * 2024-05-07T07:09:48Z
             */
            created_at?: string; // date-time
        }
        /**
         * User list response
         * User list response.
         */
        export interface UserListResponseAttribute {
            /**
             * example:
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            id?: string;
            /**
             * example:
             * Hasib
             */
            name?: string;
            /**
             * example:
             * hasib
             */
            username?: string;
            /**
             * example:
             * hasib@hasib.com
             */
            email?: string;
            /**
             * example:
             * +8801917200115
             */
            phone?: string;
            /**
             * example:
             * 1600
             */
            balance?: string;
        }
        /**
         * User response
         * User response.
         */
        export interface UserResponseAttribute {
            /**
             * example:
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            id?: string;
            /**
             * example:
             * Hasib
             */
            name?: string;
            /**
             * example:
             * hasib
             */
            username?: string;
            /**
             * example:
             * hasib@hasib.com
             */
            email?: string;
            /**
             * example:
             * +8801917200115
             */
            phone?: string;
            role?: /**
             * Role response
             * Role response.
             */
            RoleResponseAttribute;
            balance?: {
                /**
                 * example:
                 * 1600
                 */
                total?: string;
                amounts?: {
                    /**
                     * example:
                     * 1600
                     */
                    "event-coin1"?: string;
                };
                /**
                 * example:
                 * 2024-05-21T10:16:00.150Z
                 */
                date?: string; // date
            };
        }
    }
}
declare namespace Paths {
    namespace Coins {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * Coins list.
                 */
                message?: string;
                data?: {
                    coins?: /**
                     * Coin list response
                     * Coin list response.
                     */
                    Components.Schemas.CoinListResponseAttribute[];
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $403 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 403
                 */
                statusCode?: number;
                /**
                 * example:
                 * This action is unauthorized.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $500 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 500
                 */
                statusCode?: number;
                /**
                 * example:
                 * Server error.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetAllTransactions {
        namespace Parameters {
            export type User = string;
        }
        export interface QueryParameters {
            user?: Parameters.User;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * Transaction list.
                 */
                message?: string;
                data?: {
                    transactions?: /**
                     * Transaction response
                     * Transaction response.
                     */
                    Components.Schemas.TransactionResponse[];
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $403 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 403
                 */
                statusCode?: number;
                /**
                 * example:
                 * This action is unauthorized.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $500 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 500
                 */
                statusCode?: number;
                /**
                 * example:
                 * Server error.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetAllUsers {
        namespace Parameters {
            export type Page = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * Users list.
                 */
                message?: string;
                data?: {
                    users?: /**
                     * User list response
                     * User list response.
                     */
                    Components.Schemas.UserListResponseAttribute[];
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $403 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 403
                 */
                statusCode?: number;
                /**
                 * example:
                 * This action is unauthorized.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $500 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 500
                 */
                statusCode?: number;
                /**
                 * example:
                 * Server error.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetProfile {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * Current authenticated user info.
                 */
                message?: string;
                data?: {
                    user?: /**
                     * User response
                     * User response.
                     */
                    Components.Schemas.UserResponseAttribute;
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace Login {
        export type RequestBody = /**
         * Login request
         * Login request.
         */
        Components.Schemas.LoginRequestAttribute;
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * User has been logged in successfully.
                 */
                message?: string;
                data?: {
                    user?: /**
                     * Login response
                     * Login response.
                     */
                    Components.Schemas.AuthResponseAttribute;
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace Payments {
        export type RequestBody = /**
         * Transaction request
         * Transaction request
         */
        Components.Schemas.PaymentRequestAttribute;
        namespace Responses {
            export interface $201 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 201
                 */
                statusCode?: number;
                /**
                 * example:
                 * Transaction list.
                 */
                message?: string;
                data?: {
                    transaction?: /**
                     * Payment response
                     * Payment response.
                     */
                    Components.Schemas.PaymentResponseAttribute;
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $403 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 403
                 */
                statusCode?: number;
                /**
                 * example:
                 * This action is unauthorized.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $500 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 500
                 */
                statusCode?: number;
                /**
                 * example:
                 * Server error.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace Recharge {
        export type RequestBody = /**
         * Recharge request
         * Recharge request.
         */
        Components.Schemas.RechargeRequestAttribute;
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * Transaction list.
                 */
                message?: string;
                data?: {
                    transaction?: /**
                     * Recharge response
                     * Recharge response.
                     */
                    Components.Schemas.RechargeResponseAttribute;
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $403 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 403
                 */
                statusCode?: number;
                /**
                 * example:
                 * This action is unauthorized.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
            export interface $500 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 500
                 */
                statusCode?: number;
                /**
                 * example:
                 * Server error.
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace RefreshToken {
        export type RequestBody = /**
         * Refresh token request
         * Refresh token request.
         */
        Components.Schemas.RefreshTokenRequestAttribute;
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 200
                 */
                statusCode?: number;
                /**
                 * example:
                 * Refresh token.
                 */
                message?: string;
                data?: {
                    token?: /**
                     * Refresh token response
                     * Refresh token response.
                     */
                    Components.Schemas.RefreshTokenResponseAttribute;
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace Register {
        export type RequestBody = /**
         * Registration request
         * Registration request.
         */
        Components.Schemas.RegistrationRequestAttribute;
        namespace Responses {
            export interface $201 {
                /**
                 * example:
                 * true
                 */
                success?: boolean;
                /**
                 * example:
                 * 201
                 */
                statusCode?: number;
                /**
                 * example:
                 * User has been registered successfully.
                 */
                message?: string;
                data?: {
                    user?: /**
                     * Login response
                     * Login response.
                     */
                    Components.Schemas.AuthResponseAttribute;
                };
            }
            export interface $401 {
                /**
                 * example:
                 * false
                 */
                success?: boolean;
                /**
                 * example:
                 * 401
                 */
                statusCode?: number;
                /**
                 * example:
                 * Unauthorized
                 */
                message?: string;
                errors?: {
                    [key: string]: any;
                };
            }
        }
    }
}

export interface OperationMethods {
  /**
   * register - User register.
   * 
   * User registration
   */
  'register'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Register.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Register.Responses.$201>
  /**
   * login - User login.
   * 
   * Login user
   */
  'login'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Login.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Login.Responses.$200>
  /**
   * getProfile - Get user profile
   * 
   * Retrieve user profile information.
   */
  'getProfile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProfile.Responses.$200>
  /**
   * refreshToken - Generate access token and refresh token using refresh token.
   * 
   * refresh token
   */
  'refreshToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RefreshToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RefreshToken.Responses.$200>
  /**
   * coins - Return the coins list.
   * 
   * Return the coins list.
   */
  'coins'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Coins.Responses.$200>
  /**
   * payments - Payment to another account.
   * 
   * payments an account.
   */
  'payments'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Payments.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Payments.Responses.$201>
  /**
   * getAllTransactions - Get transaction list
   * 
   * Retrieve user transaction.
   */
  'getAllTransactions'(
    parameters?: Parameters<Paths.GetAllTransactions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllTransactions.Responses.$200>
  /**
   * recharge - Recharge an account
   * 
   * Recharge an account.
   */
  'recharge'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Recharge.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Recharge.Responses.$200>
  /**
   * getAllUsers - Get user list
   * 
   * Retrieve user user.
   */
  'getAllUsers'(
    parameters?: Parameters<Paths.GetAllUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllUsers.Responses.$200>
}

export interface PathsDictionary {
  ['/api/register']: {
    /**
     * register - User register.
     * 
     * User registration
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Register.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Register.Responses.$201>
  }
  ['/api/login']: {
    /**
     * login - User login.
     * 
     * Login user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Login.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Login.Responses.$200>
  }
  ['/api/v1/me']: {
    /**
     * getProfile - Get user profile
     * 
     * Retrieve user profile information.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProfile.Responses.$200>
  }
  ['/api/refresh']: {
    /**
     * refreshToken - Generate access token and refresh token using refresh token.
     * 
     * refresh token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RefreshToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RefreshToken.Responses.$200>
  }
  ['/api/v1/coins']: {
    /**
     * coins - Return the coins list.
     * 
     * Return the coins list.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Coins.Responses.$200>
  }
  ['/api/v1/payments']: {
    /**
     * payments - Payment to another account.
     * 
     * payments an account.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Payments.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Payments.Responses.$201>
  }
  ['/api/v1/transactions']: {
    /**
     * getAllTransactions - Get transaction list
     * 
     * Retrieve user transaction.
     */
    'get'(
      parameters?: Parameters<Paths.GetAllTransactions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllTransactions.Responses.$200>
  }
  ['/api/v1/recharge']: {
    /**
     * recharge - Recharge an account
     * 
     * Recharge an account.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Recharge.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Recharge.Responses.$200>
  }
  ['/api/v1/users']: {
    /**
     * getAllUsers - Get user list
     * 
     * Retrieve user user.
     */
    'get'(
      parameters?: Parameters<Paths.GetAllUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllUsers.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
