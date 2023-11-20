import { createToken, verifyToken } from "../../utils/jwtUtil";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    try {
      const user = await this.authService.signIn(req.body);
      if(!user) return res.status(401).json({ message: "contraseña incorecta" });
      const mitoken={email:user.email, code:user.code}
      return res.status(200).json(createToken(mitoken));
      
    } catch (e) {
      return res.status(e.code).json({ message: e.message });
    }
  }

  async register(req, res) {
    const user = await this.authService.signUp(req.body);
    return res.status(201).json(user);
  }

  async refreshAccess(req, res) {
    const { refresh_token } = req.body;
    const { identity } = verifyToken(refresh_token);
    const user = await this.authService.refreshToken(identity.email);
    const { accessToken } = createToken(mitoken);
    return res.status(200).json({ accessToken });
  }
}
