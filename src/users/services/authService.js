const User = require("../models/userModels");
const Token = require("../models/tokenModel");
const { createJWT, generateToken } = require("../../../utils/auth");
const { CLIENT_URL } = require("../../../utils/config");
const sendMail = require("../../../utils/mailservice");
const bcrypt = require("bcrypt");

module.exports.createUser = async (username, email, password) => {
  try {
    const user = await User.create({ username, email, password });
    const token = createJWT(user._id);
    const message = "Welcome to BizzBuzz!";
    const url = `${CLIENT_URL}/accounts/${user.id}`;
    await sendMail(email, message, "View profile", url);
    return { id: user._id, username: user.username, token };
  } catch (err) {
    throw err;
  }
};

module.exports.loginUser = async (login, password) => {
  try {
    const user = await User.login(login, password);
    const token = createJWT(user._id);
    return { id: user._id, username: user.username, token };
  } catch (err) {
    throw err;
  }
};

module.exports.resetPassword = async (token, password) => {
  const id = verifyToken(token);
  if (id) {
    const user = await User.findById(id);
    if (user) {
      user.updateOne({ password });
    }
    throw Error("Invalid request");
  }
  throw Error("Unauthorized request");
};

module.exports.updatePassword = async (currentPassword, newPassword, id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) throw Error("Current password is in correct");
      user.password = newPassword;
      await user.save();
      return "Password successfully changed";
    }
    throw Error("Invalid user");
  } catch (err) {
    throw Error(err);
  }
};

module.exports.generateResetLink = async (email) => {
  try {
    // Confirm the user exist
    const user = await User.findOne({ email });
    if (!user) throw Error("Email is does not belong to a registered user");

    // Deletes existing rest token
    const token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    // Generates new reset token and save in data base
    const resetToken = generateToken();
    const salt = await bcrypt.genSalt();
    const hashedToken = await bcrypt.hash(resetToken, salt);
    await Token.create({
      userId: user._id,
      token: hashedToken,
    });
    const link = `${CLIENT_URL}/auth/confirm-reset?token=${resetToken}&id=${user._id}`;
    const message =
      "You just requested to reset your password. You can ignore if it wasn't you or else click the button below to reset your password";
    await sendMail(email, message, "Reset password", link);
    return link;
  } catch (err) {
    throw Error(err);
  }
};

module.exports.createNewPassword = async (password, id) => {
  try {
    const user = await User.findById(id);
    user.password = password;
    user.save();
    return "Password has been changed";
  } catch (err) {
    throw Error(err);
  }
};
