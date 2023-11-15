import { UserPasswordInterface } from "./usersInterface";
import { genSalt, hash, compare } from "bcryptjs";
import config from "../../config/authConfig";

export class UserPasswordService extends UserPasswordInterface {
  async hashPassword(password) {
    const salt = await genSalt(config.rounds);
    return await hash(password, salt);
  }

  async validatePassword(passwordHash, password) {
    return await compare(password, passwordHash);
  }
}
