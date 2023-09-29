import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

import User from "../models/User.js";

const secret = process.env.SECRET;

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(500).json({ message: "User already exist !" })
        }
        const hashedPassword = await bcyrpt.hash(password, 10)
        const newUser = await new User({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        })
        const result = await newUser.save();
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        res.status(201).json({ result, token })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ message: "User does not exist!" })
        }
        const isPasswordCorrect = await bcyrpt.compareSync(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" })
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token: token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}
