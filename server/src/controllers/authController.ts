import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import generateToken from "../utils/generateToken";


export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Validation of fields 
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    // if user present
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "sales"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id.toString(), user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation of fields
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    // Check for user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id.toString(), user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};