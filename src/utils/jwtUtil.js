import { sign, verify } from "jsonwebtoken";
import config from "../config/authConfig";

export const createToken = (identity) => {
  console.log("Config:", config);
  const { secretKey, accessExpire, refreshExpire } = config;

  const accessToken = sign({ identity }, secretKey, {
    expiresIn: accessExpire,
  });

  const refreshToken = sign({ identity }, secretKey, {
    expiresIn: refreshExpire,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token) => {
  console.log("Verifying token with secret key:", config.secretKey);

  return verify(token, config.secretKey);
};
