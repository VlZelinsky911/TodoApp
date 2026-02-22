export { AuthService } from "./auth.service.js";
export { default as authRouter } from "./auth.router.js";
export { loginSchema, registerSchema, refreshSchema } from "./auth.schemas.js";
export type {
  RegisterInput,
  LoginInput,
  RefreshInput,
} from "./auth.schemas.js";
export type { AuthResult, LogoutResult } from "./auth.types.js";
export {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  me,
} from "./auth.controller.js";

export {
  RegisterDto,
  LoginDto,
  registerDtoSchema,
  loginDtoSchema,
  UserDto,
  AuthResponseDto,
  MeResponseDto,
  MessageResponseDto,
  ErrorResponseDto,
} from "./dto/index.js";
