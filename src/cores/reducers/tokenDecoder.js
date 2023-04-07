import jwt_decode from "jwt-decode";

export function tokenDecoder(token) {
  const tokenData = jwt_decode(token);
  return tokenData;
}
