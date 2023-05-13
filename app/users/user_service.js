const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_KEY } = require("../../config/constants");
const userRepository = require("./user_repository");

async function signup(payload) {
  const { email, phoneNumber, password, firstName, lastName, referralCode } =
    payload;
  try {
    let user = await userRepository.findOne({ email });

    if (user) {
      console.error("User with email already exists. ", user);
      return { error: `User with this email already exists.` };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let creatdUser = await userRepository.create({
      email,
      phoneNumber,
      password: hashedPassword,
      referralCode,
      firstName,
      lastName,
    });
    let data = {
      email: creatdUser.email,
    };
    const token = jwt.sign(data, JWT_KEY, { expiresIn: "24h" });
    data.token = token;
    return { data };
  } catch (err) {
    console.log("Signup error ", err);
    return { error: "Unable to complete signup" };
  }
}

async function login(username, password) {
  try {
    const userAuth = await userRepository.findOne({
      email: username,
    });

    if (!userAuth) {
      return { error: "Invalid username or password" };
    }
    const isValid = await bcrypt.compare(password, userAuth.password);

    if (!isValid) {
      return { error: "Invalid username or password" };
    }

    // let user = await userRepository.findOne({ email: userAuth.email });
    let data = {
      // username: userAuth.email,
      username,
    };
    const token = jwt.sign(data, JWT_KEY, { expiresIn: "24h" });
    data.token = token;
    delete data.username;
    return { data };
  } catch (err) {
    console.log("Something went wrong", err);
    return { error: err };
  }
}

module.exports = {
  signup,
  login,
};
