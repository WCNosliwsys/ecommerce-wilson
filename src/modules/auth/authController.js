import { createToken, verifyToken } from "../../utils/jwtUtil";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    const user = await this.authService.signIn(req.body);
    // Validar usuario exista y este activo
    // Validar la contraseña
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado y/o contraseña incorrecta" });
    }
    return res.status(200).json(createToken(user.id));
  }

  async register(req, res) {
    const user = await this.authService.signUp(req.body);
    return res.status(201).json(user);
  }

  async refreshAccess(req, res) {
    const { refresh_token } = req.body;
    const { identity } = verifyToken(refresh_token);
    const user = await this.authService.refreshToken(identity);
    const { accessToken } = createToken(user.id);
    return res.status(200).json({ accessToken });
  }
}
