export interface UserDto {
  id: string;
  email: string;
  createdAt?: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface ValidationErrorDto {
  field: string;
  message: string;
}

export interface ApiResponseDto<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
  errors?: ValidationErrorDto[];
}

export interface AuthDataDto {
  accessToken: string;
  user: UserDto;
}

export interface MeDataDto {
  user: UserDto;
}

export type AuthResponseDto = ApiResponseDto<AuthDataDto>;
export type MeResponseDto = ApiResponseDto<MeDataDto>;
export type MessageResponseDto = ApiResponseDto<never> & { message: string };

export interface ErrorResponseDto {
  status: "error";
  message: string;
  errors?: ValidationErrorDto[];
}
