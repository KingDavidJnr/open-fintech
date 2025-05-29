const dotenv = require("dotenv");
const userService = require("../services/user.service");
const { hashPassword, comparePasswords } = require("../utils/bcrypt");
const generateUserId = require("../utils/generate_user_id.util");
const sendVerificationEmail = require("../utils/verify_email.util");
const { generateToken } = require("../utils/jwt.util");
const { sequelize } = require("../../models");

dotenv.config();

class UserController {
  // Sign up a new user
  async signUp(req, res) {
    const transaction = await sequelize.transaction(); // Start transaction

    try {
      let { first_name, last_name, email, password } = req.body;

      // Normalize email
      email = email?.toLowerCase().trim();

      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      // Check if email already exists
      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        if (existingUser.isVerified) {
          return res
            .status(400)
            .json({ message: "User account exists already. Kindly login!" });
        } else {
          return res.status(300).json({ message: "Email already exists" });
        }
      }

      // Generate a unique user ID
      let userId;
      let userExists;
      do {
        userId = generateUserId();
        userExists = await userService.getUserById(userId);
      } while (userExists);

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the user
      const newUser = await userService.createUser(
        {
          user_id: userId,
          first_name,
          last_name,
          email,
          password: hashedPassword,
        },
        { transaction }
      );

      // Commit transaction after successful insert
      await transaction.commit();

      // Prepare user response payload
      const userResponse = {
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      };

      // Generate JWT token
      const token = generateToken(newUser.user_id);

      // Set cookie with token for 30 minutes
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: "None",
      });

      // Send response
      res.status(201).json({
        message: "User account created successfully",
        user: userResponse,
      });

      // Now asynchronously send the verification email
      const verification_link = `${process.env.BASE_URL}/v1/verify-email?user_id=${newUser.user_id}`;

      sendVerificationEmail(email, first_name, verification_link)
        .then(() => console.log("Verification email sent"))
        .catch((error) => console.error("Failed to send email:", error));
    } catch (error) {
      await transaction.rollback(); // Rollback if anything fails
      console.error("There was a user signup error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error - Failed to create user" });
    }
  }

  async verifyEmail(req, res) {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    try {
      const user = await userService.getUserById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.is_verified) {
        return res.redirect("/email-already-verified");
      }

      await userService.verifyUserEmail(user_id);

      return res.redirect("/email-verified-success");
    } catch (error) {
      console.error("Error verifying email:", error);
      return res.status(500).json({ message: "Failed to verify email" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate request body
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required!" });
      }

      // Check if user exists
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Verify password
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password!" });
      }

      // Generate JWT token
      const token = generateToken(user.user_id);

      // Set cookie with token for 30 minutes
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: "None",
      });

      // Respond with success message and user info (excluding sensitive info)
      const userResponse = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        is_verified: user.is_verified,
      };

      return res.status(200).json({
        message: "Login successful",
        user: userResponse,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Login failed", error: error.message });
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.user_id);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const updatedUser = await userService.updateUser(
        req.user.user_id,
        req.body
      );
      res.json({ message: "User updated", updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.user.user_id);
      res.json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("token");
      res.json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
