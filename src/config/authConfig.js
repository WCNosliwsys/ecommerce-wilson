export default {
  rounds: 10,
  secretKey: process.env.JWT_SECRET_KEY,
  accessExpire: process.env.JWT_ACCESS_EXPIRE,
  refreshExpire: process.env.JWT_REFRESH_EXPIRE,
};
