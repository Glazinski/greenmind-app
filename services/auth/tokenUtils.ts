export const isTokenExpired = (expirationTimestamp: number): boolean =>
  new Date().getTime() >= expirationTimestamp;
