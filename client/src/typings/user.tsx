export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterResult {
  data: {
    token: string;
  };
  success: boolean;
  message?: any;
}

export interface LoginResult {
  data: {
    token: string;
  };
  success: boolean;
  message?: any;
}