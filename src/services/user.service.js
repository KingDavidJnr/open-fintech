const bcrypt = require("bcrypt");
const db = require("../../models");
const { Op, fn, col, where } = require("sequelize");
const User = db.User;
const { generateToken } = require("../utils/jwt.util");

class UserService {
  // Create a new user
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error("Failed to create user: " + error.message);
    }
  }

  // Get a single user by ID
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user ? user : null; // Return null if user not found
    } catch (error) {
      throw new Error("Failed to get user: " + error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: where(fn("LOWER", col("email")), email.toLowerCase()),
      });
      return user;
    } catch (error) {
      throw new Error("Failed to get user: " + error.message);
    }
  }

  // Fetch user by username
  async getUserByUsername(username) {
    try {
      const user = await User.findOne({
        where: where(fn("LOWER", col("username")), username.toLowerCase()),
      });
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user by username");
    }
  }

  // Get all users
  // Get all users without pagination
  async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: [
          "user_id",
          "first_name",
          "last_name",
          "email",
          "isVerified",
        ], // Only non-sensitive fields
      });

      return users;
    } catch (error) {
      throw new Error("Failed to get users: " + error.message);
    }
  }

  // Update a user by ID (PATCH method)
  async updateUser(userId, userData) {
    try {
      const [affectedRows, [updatedUser]] = await User.update(userData, {
        where: { user_id: userId },
        returning: true,
      });

      if (affectedRows === 0) {
        return "User not found or no changes made";
      }

      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  // Delete a user by ID
  async deleteUser(userId) {
    try {
      const entry = await User.findByPk(userId);
      if (!entry) {
        throw new Error(`No user found with ID ${id}`);
      }
      await entry.destroy();
      return { message: `User with ID ${userId} deleted successfully` };
    } catch (error) {
      throw new Error(`Error deleting user by ID: ${error.message}`);
    }
  }
}

module.exports = new UserService();
