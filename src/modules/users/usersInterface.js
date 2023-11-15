export class UserInterface {
  getAll() {}
  getById(id) {}
  create(body) {}
  update(id, body) {}
  delete(id) {}
}

export class UserPasswordInterface {
  hashPassword(password) {}
  validatePassword(passwordHash, password) {}
}
