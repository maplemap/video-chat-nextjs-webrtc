export enum ROUTE {
  MAIN = '/',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  ERROR = '/auth/error',
}

export const authRoutes = [ROUTE.SIGN_IN, ROUTE.SIGN_UP, ROUTE.ERROR];
export const apiAuthPrefix = '/api/auth';
