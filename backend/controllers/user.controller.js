const User = require("../model/user.model.js");
const zod = require("zod");
const bcrypt = require("bcrypt");
const generateTokenAndSaveInCookies = require("../JWT/token.js");

// Validation schema including role
const userSchema = zod.object({
  email: zod.string().email({ message: "Invalid Email address" }),
  username: zod.string().min(3, { message: "Username must be at least 3 characters" }).max(30),
  password: zod.string().min(8, { message: "Password must be at least 8 characters" }).max(255),
  role: zod.enum(["admin", "member"], { message: "Role must be admin or member" }),
});

// SIGN UP
const signUp = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    if (!email || !username || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const validation = userSchema.safeParse({ email, username, password, role });

    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ success: false, errors: errorMessage });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword, role });
    await newUser.save();

    const token = await generateTokenAndSaveInCookies(newUser._id, res);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while registering user" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({
      success: true,
      message: "User login successful",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role, // Sending role information in login response
      },
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Error occurred while logging in" });
  }
};

// LOGOUT
const logOut = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while logging out",
    });
  }
};

module.exports = { signUp, login, logOut };
