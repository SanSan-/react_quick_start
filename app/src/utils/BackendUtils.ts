import { JwtResponse } from '~types/response';
import { DOT_SIGN } from '~const/common';

export const getExpiredTime = (token: string): number => {
  const split = token.split(DOT_SIGN);
  if (split.length < 2) {
    return null;
  }
  try {
    const jwt: JwtResponse = JSON.parse(atob(split[1])) as JwtResponse;
    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      return jwt.exp * 1000;
    }
  } catch (e) {
    return null;
  }
};

export const isExpired = (token: string): boolean => {
  const expiredTime = getExpiredTime(token);
  return expiredTime ? expiredTime <= new Date().getTime() : true;
};

export const isNotExpired = (token: string): boolean => !isExpired(token);
