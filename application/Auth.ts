/**
 * サインインのリクエストのbody部。
 */
export interface SignInRequest {
  email: string;
  password: string;
}

/**
 * サインインのレスポンスのbody部。
 */
export interface SignInResponse {
  succeed: boolean;
  error?: string;
}

/**
 * サインアップのリクエストのbody部。
 */
export interface SignUpRequest {
  email: string;
  password: string;
}

/**
 * サインアップのレスポンスのbody部。
 */
export interface SignUpResponse {
  succeed: boolean;
  error?: string;
}
