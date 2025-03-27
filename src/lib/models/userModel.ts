// src/models/User.ts
import mongoose, { Schema, models, model } from "mongoose";
import { UserRoleEnum, UserRoleEnumArray } from "@/utils/types/api/common";

// Define indexes at schema level for better query performance
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true, // Remove whitespace
      index: true // Index for faster searches
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Store emails in lowercase
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      select: false // Don't include password in queries by default
    },
    role: {
      type: String,
      required: true,
      enum: UserRoleEnumArray, // Restrict to valid roles
      default: UserRoleEnum.USER,
      index: true // Index for role-based queries
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    }
  },
  {
    timestamps: true,
    toJSON: { // Transform output
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Add compound index for common query patterns
userSchema.index({ email: 1, fullName: 1 });

// Use existing model if it exists (prevents overwriting in Next.js hot reload)
export const UserModel = models.User || model("User", userSchema);
