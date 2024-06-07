const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
const User = require("../../models/userSchema");
const uploadCloudinary = require("../../utils/uploadCloudinary");

//create a user
const registerUser = async (req, res, next) => {
  try {
    const { password, name, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 11);
    let profilePic = null;
    let picture_info = {};

    if (req.file?.buffer) {
      const fileUpload = await uploadCloudinary(req.file);
      if (!fileUpload) {
        return res
          .status(500)
          .json({ message: "Server error during file upload!" });
      }
      profilePic = fileUpload.secure_url;
      picture_info = {
        public_key: fileUpload.public_id,
        file_name: req.file.filename,
      };
    }

    const user = new User({
      name,
      email,
      profilePic,
      picture_info,
      password: hashedPassword,
      role: "user",
    });

    const userData = await user.save();
    if (!userData._id) {
      return res
        .status(500)
        .json({ message: "There was an error during user registration!" });
    }

    res.status(200).json({
      message: "Successfully registered the user",
      data: { user: userData },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

//login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "user") {
      return res.status(403).json({ message: "Access denied" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userInfo = { ...user._doc };
    delete userInfo.password;

    const token = jwt.sign(userInfo, process.env.JWT_SECTET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: userInfo,
        accessToken: token,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

//check user login or not
const checkUser = async (req, res) => {
  try {
    if (req.userId && req.email) {
      return res.status(200).json({
        message: "User is logged in",
        status: 200,
      });
    }

    res.status(401).json({
      message: "User is not logged in",
      status: 401,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  checkUser,
};
