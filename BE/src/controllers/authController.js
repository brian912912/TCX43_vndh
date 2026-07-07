const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PendingRegistration = require("../models/PendingRegistration");
const { sendOtpEmail } = require("../utils/emailService");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and role are required." });
    }

    if (!["Tourist", "Tour Guide"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Role must be either Tourist or Tour Guide." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const otp = generateOtp();

    await PendingRegistration.deleteMany({ email: email.toLowerCase() });

    await PendingRegistration.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      message:
        "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    next(error);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const pending = await PendingRegistration.findOne({
      email: email.toLowerCase(),
    }).sort({ createdAt: -1 });
    if (!pending) {
      return res
        .status(404)
        .json({ message: "No pending registration found for this email." });
    }

    if (new Date(pending.expiresAt) < new Date()) {
      await PendingRegistration.deleteOne({ _id: pending._id });
      return res
        .status(400)
        .json({ message: "OTP has expired. Please register again." });
    }

    if (pending.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    const user = await User.create({
      name: pending.name,
      email: pending.email,
      passwordHash: pending.passwordHash,
      role: pending.role,
    });

    await PendingRegistration.deleteOne({ _id: pending._id });

    const token = signToken(user);
    return res.status(201).json({
      message: "Registration successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(user);
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, verifyOtp, login };
