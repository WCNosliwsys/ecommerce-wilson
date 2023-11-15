import { AuthInterface } from "./authInterface";
export class AuthService extends AuthInterface {
  constructor(userModel, passwordService, userService) {
    super();
    this.userModel = userModel;
    this.passwordService = passwordService;
    this.userService = userService;
  }


  async signIn(body) {
    const { username, password } = body;
    const user = await this.userService.getById(username);
    if (user) {
      const validatePassword = await this.passwordService.validatePassword(
        user.password,
        password
      );
      if (!validatePassword) {
        return false;
      }
    }
    return user;
  }

  async signUp(body) {
    return await this.userService.create(body);
  }

  async refreshToken(identity) {
    return await this.userService.getById(identity);
  }

  resetPassword(body) {}
}
