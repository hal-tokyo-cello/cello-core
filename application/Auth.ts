export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  succeed: boolean;
  error?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  succeed: boolean;
  error?: string;
}
