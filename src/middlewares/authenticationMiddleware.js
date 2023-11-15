import { verifyToken } from "../utils/jwtUtil";
import { AuthorizationNotFound } from "../modules/auth/authException";

export const isAuthenticated = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AuthorizationNotFound();
    }

    const accessToken = authorization.split(" ")[1];
    const { identity } = verifyToken(accessToken);
    req.current_user = identity;
    return next();
  } catch (e) {
    return res.status(e.code || 403).json({ message: e.message });
  }
};
