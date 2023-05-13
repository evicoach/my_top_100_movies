jest.mock("../app/users/user_repository.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
const userRepository = require("../app/users/user_repository");
const userService = require("../app/users/user_service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("User Service", () => {
  beforeEach(() => {});
  it("should register a user and return the token of the registered user", async () => {
    userRepository.create = jest
      .fn()
      .mockReturnValue({ email: "user@email.com" });
    userRepository.findOne = jest.fn().mockReturnValue(null);
    const payload = {
      //   email:"evicoach@gmail.com",
      //   phoneNumber:"08123456789",
      //   password:"password",
      //   firstName: "john",
      //   lastName: "doe",
    };
    await userService.signup(payload);
    expect(userRepository.findOne).toBeCalled();
    expect(userRepository.create).toBeCalled();
  });

  it("should log user in", async () => {
    bcrypt.compare = jest.fn().mockReturnValue(true);
    userRepository.findOne = jest.fn().mockReturnValue(true);

    const payload = {
      username: "evicoach@gmail.com",
      password: "password",
    };
    await userService.login(payload);
    expect(bcrypt.compare).toBeCalled();
    expect(jwt.sign).toBeCalled();
  });
});
