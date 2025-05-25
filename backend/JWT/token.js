const jwt = require("jsonwebtoken");

const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod, false in dev
    sameSite: "strict", // better CSRF protection
    path: "/",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  // ❌ Optional: only do this if you're implementing token revocation/tracking
  // await User.findByIdAndUpdate(userId, { token });

  return token;
};

module.exports = generateTokenAndSaveInCookies;
