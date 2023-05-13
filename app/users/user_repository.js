const Repository = require("../../database/repository");
const User = require("./user_model");
class UserRepository extends Repository {
  constructor() {
    super(User);
  }
}
module.exports = new UserRepository();