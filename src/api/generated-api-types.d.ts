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
         * Login response
         * Login response.
         */
        export interface LoginResponseAttribute {
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
            /**
             * example:
             * eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YmZkZDM4YS0xNGU5LTRkZjAtODYyNi1hNDI5MDk3MGJhNDgiLCJqdGkiOiI0NTI2MDU4MzkxNzdlYmM5NjU0N2I1NzMyNGE2NzZkMjljYmUwYWU4MGM5ZDQ4NzNhNzAwMzI3ZGZhMTdlZDNlYzQ4OWE3NjdmMTYyZWIyNCIsImlhdCI6MTcxNTc2Nzk5Mi45MDY2NzUsIm5iZiI6MTcxNTc2Nzk5Mi45MDY2NzgsImV4cCI6MTc0NzMwMzk5Mi44MjYyOTgsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.h5uCmHMwYak3zzt_NBvxZ92qo_PRXocEFgjXlYPP-DWcGH81h__e8F2s-ER59aPj01C49eTzNoXtOo5Pruro01uQcX7-eWkvy-Ecc_Fu3H3iOWpzobXRdsaJKe2Ac8VMIglJ5GcIB8xR8nlgV-ad75VNA339Pok1XniyHdacpglXbYSH_S3XXAa2jEFaT_ed4u-gpotiGlGJUsu9hzvisxlmbBtcHgfkvQ6YX6WqGa-q68tia0NtRvLkRiH-0B7jK6tQqedezK9h1Uz9SsKPAr3kzHRUzSozK7cZN2GChLxckxuj47RAn87dZD1oz36zbNh41sTLqHHiVTfRL_eSZXo6C81JU4MPPogqdf7qzj1zRVMhevQMhbgW589JfPbQZwYMsOqlCjB9l9S0LkXFdnolNQlJRW_7mNiDQk8HybmYUxZYtU9cBR6lISJcLImW-d0S4RGi6Y-C6QVPVcC5Fut8_jHbkgh4YkFvvfg0TjuxTBQBh0kGDkNN2KNoJfLf6D5S-kTUNFsS5gTPNkVZnDERY3cd-jwx49asywJ4QygC47dIL9CHaIJrLQ_Y9IZCmfgkdDec04aqDJZa4zyIoqjDVN4RZCyt03gWwYiE_BktRm5dZD0etviWZhRTrp9WCSEANRB36Y7L0cLF3QLYEowjhCdYBKmYY60yPpBfq08
             */
            accessToken?: string;
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
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            sender_id?: number;
            /**
             * example:
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            receiver_id?: number;
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
             * 9c0fee7c-608f-4e88-8f17-0bac9a8014d9
             */
            receiver_id?: number;
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
        }
    }
}
declare namespace Paths {
    namespace GetAllTransactions {
        namespace Parameters {
            export type UserId = number;
        }
        export interface QueryParameters {
            user_id?: Parameters.UserId;
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
                    Components.Schemas.LoginResponseAttribute;
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
   * Login - User login.
   * 
   * Login user
   */
  'Login'(
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
     * Login - User login.
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
